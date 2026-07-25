output "vpc_id" {
description = " vpc id"
value = aws_vpc.myvpc.id
}
output "public_subnet1_id" {
description = " id of public subnet1"
value = aws_subnet.public1.id
}

output "public_subnet2_id" {
description = " id of public subnet2"
value = aws_subnet.public2.id
}
output "private_subnet_id" {
description = " id of public subnet1"
value = aws_subnet.private.id
}
output "private_subnet2_id" {
description = " id of public subnet2"
value = aws_subnet.private2.id
}

output "internet_gateway_id" {
description = "Internet Gateway ID"
value = aws_internet_gateway.igw.id
}

output "nat_gateway_id" {
  description = "NAT Gateway ID"
  value       = aws_nat_gateway.nat.id
}

output "public_route_table_id" {
  description = "Public Route Table ID"
  value       = aws_route_table.public.id
}

output "private_route_table_id" {
  description = "Private Route Table ID"
  value       = aws_route_table.private.id
}





