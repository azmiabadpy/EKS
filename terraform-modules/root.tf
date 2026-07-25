provider "aws"{
region = "ap-south-1"
}

module "vpc" {
source = "./vpc_module"
vpc_cidr = "10.0.0.0/16"
public_subnet1_cidr = "10.0.1.0/24"
public_subnet2_cidr = "10.0.2.0/24"
private_subnet_cidr = "10.0.3.0/24"
private_subnet_cidr =  "10.0.4.0/24"
public1_az1 = "ap-south-1a"
public1_az2 = "ap-south-1b"
private_az1  = "ap-south-1a"
private_az2 = "ap-south-1b"
}

module"security"{
source = "./security_module"
vpc_id = module.vpc.vpc_id
}

module "ec2" {
  source = "./instance_module"

  ami_id            = "ami-01a00762f46d584a1"
  key_name          = "azmi"
  security_group_id = module.security.web_security_id

  subnet1_id = module.vpc.public_subnet1_id
  subnet2_id = module.vpc.public.subnet2.id
}
