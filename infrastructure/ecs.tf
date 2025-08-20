resource "aws_ecs_cluster" "this" {
  name = "${var.project_name}-${var.app_env}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "${var.project_name}-${var.app_env}-cluster"
  }
}
