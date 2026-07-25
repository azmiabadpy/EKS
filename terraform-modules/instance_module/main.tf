resource "aws_instance" "server1" {
  ami                    = var.ami_id
  subnet_id              = var.subnet1_id
  instance_type          = "t3.micro"
  key_name               = var.key_name
  vpc_security_group_ids = [var.security_group_id]

  tags = {
    Name = "public-server1"
  }
}

resource "aws_instance" "server2" {
  ami                    = var.ami_id
  subnet_id              = var.subnet2_id
  instance_type          = "t3.micro"
  key_name               = var.key_name
  vpc_security_group_ids = [var.security_group_id]

  tags = {
    Name = "public-server2"
  }
}


