resource "aws_vpc" "myvpc" {
cidr_block = var.vpc_cidr
enable_dns_hostnames = true
enable_dns_support   = true
}
resource "aws_internet_gateway" "igw" {
vpc_id = aws_vpc.myvpc.id

}
resource "aws_subnet" "public1" {
 vpc_id = aws_vpc.myvpc.id
 cidr_block = var.public_subnet1_cidr
 availability_zone = var.public1_az1
 map_public_ip_on_launch = true

}
resource "aws_subnet" "public2" {
vpc_id = aws_vpc.myvpc.id
cidr_block = var.public_subnet2_cidr
availability_zone = var.public1_az2
map_public_ip_on_launch = true
}

resource "aws_subnet" "private" {
vpc_id = aws_vpc.myvpc.id
cidr_block = var.private_subnet_cidr
availability_zone = var.private_az1

}


resource "aws_subnet" "private2" {
vpc_id = aws_vpc.myvpc.id
cidr_block = var.private_subnet2_cidr
availability_zone = var.private_az2

}

resource "aws_route_table" "public" {
vpc_id = aws_vpc.myvpc.id
route {

cidr_block = "0.0.0.0/0"
gateway_id = aws_internet_gateway.igw.id

}

}
resource "aws_route_table_association" "public1" {
subnet_id = aws_subnet.public1.id
route_table_id = aws_route_table.public.id

}
resource "aws_route_table_association" "public2" {
subnet_id = aws_subnet.public2.id
route_table_id = aws_route_table.public.id

}
resource "aws_eip" "nat" {
domain = "vpc"
}
resource "aws_nat_gateway" "nat" {
allocation_id = aws_eip.nat.id
subnet_id = aws_subnet.public1.id
depends_on = [
aws_internet_gateway.igw

]

}
resource "aws_route_table" "private" {
vpc_id = aws_vpc.myvpc.id
route {
cidr_block = "0.0.0.0/0"
nat_gateway_id = aws_nat_gateway.nat.id

}

}

resource "aws_route_table_association" "private" {
subnet_id = aws_subnet.private.id
route_table_id = aws_route_table.private.id

}

resource "aws_route_table_association" "private2" {
subnet_id = aws_subnet.private2.id
route_table_id = aws_route_table.private.id

}
