terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}

provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.aws_region
}

provider "aws" {
  alias      = "us_east_1"
  access_key = var.access_key
  secret_key = var.secret_key
  region     = "us-east-1"
}
