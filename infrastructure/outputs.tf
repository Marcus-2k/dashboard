output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_ids" {
  value = [for s in aws_subnet.public : s.id]
}

output "service_sg_id" {
  value = aws_security_group.service_sg.id
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.this.name
}

output "ecs_service_name" {
  value = aws_ecs_service.app.name
}

output "task_def_family" {
  value = aws_ecs_task_definition.app.family
}

output "ecr_repository_url" {
  value = aws_ecr_repository.app.repository_url
}
