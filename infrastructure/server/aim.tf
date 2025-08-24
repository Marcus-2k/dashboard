# --------------------------
# Trust policy for ECS tasks
# --------------------------
data "aws_iam_policy_document" "ecs_task_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# --------------------------------------------------------
# 1) Execution role (used by ECS Agent to pull image/logs
#    AND to fetch secrets referenced in container 'secrets')
# --------------------------------------------------------
resource "aws_iam_role" "ecs_execution_role" {
  name               = "${var.project_name}-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role.json
}

# AWS-managed: ECR pull + CloudWatch logs
resource "aws_iam_role_policy_attachment" "ecs_execution_role_policy" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# EXTRA: allow execution role to read your app secret from Secrets Manager
# (This is required for ECS to resolve container 'secrets' at task start.)
resource "aws_iam_role_policy" "execution_read_app_secret" {
  name = "${var.project_name}-execution-read-app-secret"
  role = aws_iam_role.ecs_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "ReadAppSecret",
        Effect = "Allow",
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ],
        Resource = [
          aws_secretsmanager_secret.app_env.arn
        ]
      }
    ]
  })
}

# -----------------------------------------------------------------
# 2) Task role (permissions your application code needs at runtime)
#    Keep this if your app itself calls AWS APIs or reads secrets.
# -----------------------------------------------------------------
resource "aws_iam_role" "ecs_task_role" {
  name               = "${var.project_name}-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role.json
}

# Allow the APP (inside the container) to read the same secret if needed.
# If your app does NOT call Secrets Manager directly, you can remove this.
resource "aws_iam_role_policy" "task_read_app_secret" {
  name = "${var.project_name}-task-read-app-secret"
  role = aws_iam_role.ecs_task_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "ReadAppSecret",
        Effect = "Allow",
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ],
        Resource = [
          aws_secretsmanager_secret.app_env.arn
        ]
      }
    ]
  })
}
