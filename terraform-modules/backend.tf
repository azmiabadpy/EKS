terraform {
  backend "s3" {
    bucket = "azmiterraformmodules"
    key    = "azmi/modules/terraform.tfstate"
    region = "ap-south-1"
  }
}
