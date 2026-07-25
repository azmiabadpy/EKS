resource "aws_security_group" "web"{
description = "opening ssh and http for webserver"
vpc_id = var.vpc_id

ingress {
 description = "allowing SSh connection"
 from_port = 22
 to_port = 22
 protocol = "tcp"
 cidr_blocks = ["0.0.0.0/0"]
}
ingress {
 description = "allowing SSh connection"
 from_port = 80
 to_port = 80
 protocol = "tcp"
 cidr_blocks = ["0.0.0.0/0"]
}
egress {
 description = "outbound traffic"

 from_port = 0
 to_port = 0
 protocol = "-1"

 cidr_blocks = ["0.0.0.0/0"]
}
}


