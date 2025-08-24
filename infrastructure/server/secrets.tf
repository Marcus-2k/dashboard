
resource "aws_secretsmanager_secret" "app_env" {
  name = "${var.project_name}-${var.app_env}"
  tags = { App = var.project_name }
}


resource "aws_secretsmanager_secret_version" "app_env_v" {
  secret_id = aws_secretsmanager_secret.app_env.id

  secret_string = jsonencode({
    POSTGRES_HOST     = aws_db_instance.postgres.address
    POSTGRES_PORT     = aws_db_instance.postgres.port
    POSTGRES_USER     = var.db_username
    POSTGRES_PASSWORD = random_password.password.result
    POSTGRES_DATABASE = var.db_name
  })
}
