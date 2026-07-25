variable "vpc_cidr" {
description = " cidr for myvpc"
type = string
}
variable "public_subnet1_cidr"{
description = " cidr for public subnet 1"
type = string
}
variable "public_subnet2_cidr"{
description = "cidr for public subnet 2"
type = string 
}
variable "private_subnet_cidr" {
description = " cidr for private subnet"
type = string 
}
variable "private_subnet2_cidr" {
description = " cidr for private subnet2"
type = string
}
variable "public1_az1"{
description = "availability zone for public subnet1"
type = string
}
variable "public1_az2"{
description = " availability zone for public subnet2"
type = string
}

variable "private_az1"{
description = " availability zone for private subnet"
type = string
}

variable "private_az2"{
description = " availability zone for private subnet2"
type = string
}
