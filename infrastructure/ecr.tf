resource "aws_ecr_repository" "app" {
  name                 = var.project_name
  image_tag_mutability = "MUTABLE" # or "IMMUTABLE" if you never overwrite tags

  image_scanning_configuration {
    scan_on_push = false # keeping it minimal per your request
  }

  encryption_configuration {
    encryption_type = "AES256" # default server-side encryption
  }

  tags = {
    Name = "${var.project_name}-ecr"
  }
}
