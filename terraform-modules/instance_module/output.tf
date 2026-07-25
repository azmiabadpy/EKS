output "instance1_id" {
  value = aws_instance.server1.id
}

output "instance2_id" {
  value = aws_instance.server2.id
}

output "server1_public_ip" {
  value = aws_instance.server1.public_ip
}

output "server2_public_ip" {
  value = aws_instance.server2.public_ip
}


