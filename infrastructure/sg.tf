resource "aws_security_group" "service_sg" {
  name        = "${var.project_name}-svc-sg"
  description = "Allow public HTTP to the service"
  vpc_id      = aws_vpc.main.id

  dynamic "ingress" {
    for_each = [80, 443, 3000]
    content {
      description = "HTTP/HTTPS/API"
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  egress {
    description = "All egress"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-svc-sg"
  }
}
