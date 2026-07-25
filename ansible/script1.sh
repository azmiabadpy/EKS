sudo apt update
sudo apt install awscli -y
curl -LO "https://dl.k8s.io/release/$(curl -L -s \
  https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Verify kubectl
kubectl version --client
sudo apt install fontconfig openjdk-21-jre -y
sudo apt install docker.io -y
