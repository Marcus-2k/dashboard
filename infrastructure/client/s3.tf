resource "random_string" "suffix" {
  length  = 6
  upper   = false
  special = false
}

# Private S3 bucket for site artifacts
resource "aws_s3_bucket" "site" {
  bucket        = lower(join("-", [var.project_name, var.app_env, "cloudfront"]))
  force_destroy = true

  tags = {
    Name = "${var.project_name}-site"
  }
}

# Block all public access
resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}

# Optional: enable versioning
resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id
  versioning_configuration { status = "Enabled" }
}
