resource "aws_cloudwatch_log_group" "ecs_app" {
  name              = "/ecs/${var.project_name}"
  retention_in_days = 14

  tags = {
    App = var.project_name
  }
}
