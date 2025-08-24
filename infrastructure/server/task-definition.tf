resource "aws_ecs_task_definition" "app" {
  family                   = "${var.project_name}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = tostring(var.task_cpu)
  memory                   = tostring(var.task_memory)

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "app"
      image     = var.container_image
      essential = true

      portMappings = [{
        containerPort = var.container_port
        protocol      = "tcp"
      }]

      environment = [
        { name = "ENV", value = var.app_env },
        { name = "NODE_ENV", value = var.app_env },
        { name = "PORT", value = tostring(var.service_port) },
        { name = "NO_COLOR", value = "true" },
        { name = "LOG_LEVEL", value = "info" }
      ]

      secrets = [
        { name = "POSTGRES_HOST", valueFrom = "${aws_secretsmanager_secret.app_env.arn}:POSTGRES_HOST::" },
        { name = "POSTGRES_PORT", valueFrom = "${aws_secretsmanager_secret.app_env.arn}:POSTGRES_PORT::" },
        { name = "POSTGRES_USER", valueFrom = "${aws_secretsmanager_secret.app_env.arn}:POSTGRES_USER::" },
        { name = "POSTGRES_PASSWORD", valueFrom = "${aws_secretsmanager_secret.app_env.arn}:POSTGRES_PASSWORD::" },
        { name = "POSTGRES_DATABASE", valueFrom = "${aws_secretsmanager_secret.app_env.arn}:POSTGRES_DATABASE::" },
      ],

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs_app.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }

      # Optional container healthcheck (better for auto-recovery)
      # healthCheck = {
      #   command     = ["CMD-SHELL", "curl -f http://localhost:${var.container_port}/health || exit 1"]
      #   interval    = 30
      #   timeout     = 5
      #   retries     = 3
      #   startPeriod = 10
      # }
    }
  ])
}
