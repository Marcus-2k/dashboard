variable "access_key" {
  type = string
}

variable "secret_key" {
  type = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "aws_account_id" {
  description = "AWS account ID"
  type        = string
}

variable "project_name" {
  description = "Name prefix for tagging resources"
  type        = string
  default     = "store-dev"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "Two /24 CIDRs for public subnets"
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.20.0/24"]
}

variable "service_port" {
  description = "Public port for your API (80 or 3000)"
  type        = number
  default     = 80
}

variable "container_image" {
  description = "Full ECR image URI, e.g. 111111111111.dkr.ecr.eu-central-1.amazonaws.com/repo:tag"
  type        = string
}

variable "container_port" {
  description = "Port your Nest app listens on inside the container"
  type        = number
  default     = 3000
}

variable "task_cpu" {
  description = "Fargate CPU units (256=0.25 vCPU)"
  type        = number
  default     = 256
}

variable "task_memory" {
  description = "Fargate memory (MB)"
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Number of tasks to run"
  type        = number
  default     = 1
}
