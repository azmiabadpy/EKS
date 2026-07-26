# 🚀 End-to-End DevOps Deployment: Node.js Task Management Application on AWS EKS

![AWS](https://img.shields.io/badge/AWS-Cloud-orange)
![Terraform](https://img.shields.io/badge/Terraform-Infrastructure%20as%20Code-7B42BC)
![Ansible](https://img.shields.io/badge/Ansible-Automation-EE0000)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)
![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS-326CE5)
![Node.js](https://img.shields.io/badge/Node.js-Application-339933)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1)
![Amazon S3](https://img.shields.io/badge/Amazon%20S3-Application%20Logs-569A31)

## 📌 Project Overview

This project demonstrates a complete end-to-end DevOps workflow for deploying a containerized Node.js Task Management Application on Amazon EKS.

The infrastructure is provisioned using **Terraform**, the EC2 servers are configured using **Ansible**, and the application deployment is automated through a **Jenkins Controller–Worker CI/CD architecture**.

The application runs on Kubernetes in Amazon EKS, uses Amazon RDS MySQL for persistent data storage, and uploads application logs to Amazon S3 using IAM-based authentication.

---

# 🏗️ Complete Project Architecture

```text
                              ┌──────────────────┐
                              │    Developer     │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │      GitHub      │
                              │   Source Code    │
                              └────────┬─────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                            AWS VPC                              │
│                                                                 │
│   ┌──────────────────────┐        ┌──────────────────────┐      │
│   │ Jenkins Controller   │        │  Jenkins Worker      │      │
│   │                      │        │                      │      │
│   │ - Job Management     │ SSH    │ - Docker Build       │      │
│   │ - Pipeline Control   │───────▶│ - Docker Push        │      │
│   │ - Jenkins Master     │        │ - AWS CLI            │      │
│   └──────────────────────┘        │ - kubectl            │      │
│                                   └──────────┬───────────┘      │
│                                              │                  │
│                                              ▼                  │
│                                    ┌─────────────────┐          │
│                                    │   Amazon EKS    │          │
│                                    │                 │          │
│                                    │ ┌─────────────┐ │          │
│                                    │ │ Node.js App │ │          │
│                                    │ │ Kubernetes  │ │          │
│                                    │ │    Pod      │ │          │
│                                    │ └──────┬──────┘ │          │
│                                    └────────┼────────┘          │
│                                             │                   │
│                              ┌──────────────┴──────────────┐    │
│                              ▼                             ▼    │
│                       ┌──────────────┐              ┌──────────┐│
│                       │ Amazon RDS   │              │ Amazon   ││
│                       │ MySQL        │              │ S3       ││
│                       │              │              │ Logs     ││
│                       └──────────────┘              └──────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 🔄 Complete DevOps Workflow

```text
Developer
    ↓
Push Code to GitHub
    ↓
Jenkins Controller
    ↓
Jenkins Worker
    ↓
Checkout Source Code
    ↓
Build Docker Image
    ↓
Push Image to Docker Hub
    ↓
Deploy to Amazon EKS
    ↓
Kubernetes Service
    ↓
AWS Load Balancer
    ↓
Node.js Application
    ├──→ Amazon RDS MySQL
    │      └── Task Data
    │
    └──→ Amazon S3
           └── Application Logs
```

---

# 🧱 Infrastructure as Code with Terraform

Terraform was used to provision the AWS infrastructure.

## Infrastructure Provisioned

* Custom VPC
* Subnets
* Internet Gateway
* Route Tables
* Security Groups
* Jenkins Controller EC2 instance
* Jenkins Worker EC2 instance
* Amazon EKS infrastructure
* Amazon RDS MySQL
* Amazon S3 bucket

Terraform provides:

* Infrastructure as Code
* Reproducible environments
* Version-controlled infrastructure
* Automated resource provisioning
* Reduced manual configuration

Example Terraform workflow:

```text
Terraform Code
      ↓
terraform init
      ↓
terraform plan
      ↓
terraform apply
      ↓
AWS Infrastructure
```

---

# ⚙️ Server Configuration with Ansible

After Terraform provisioned the EC2 instances, Ansible was used to configure the servers.

## Jenkins Controller

The Jenkins Controller is responsible for:

* Managing Jenkins jobs
* Managing pipeline execution
* Triggering builds
* Managing Jenkins agents
* Coordinating the CI/CD process

## Jenkins Worker

The Jenkins Worker performs the actual build and deployment tasks:

* Git checkout
* Docker image build
* Docker image push
* AWS CLI operations
* Kubernetes commands
* EKS deployments

Ansible was used to install and configure required tools such as:

* Docker
* AWS CLI
* kubectl
* Jenkins dependencies
* Required system packages

---

# 🔗 Jenkins Controller–Worker Architecture

```text
┌──────────────────────────┐
│    Jenkins Controller    │
│                          │
│  - Pipeline Management   │
│  - Job Scheduling        │
│  - Build Coordination    │
└────────────┬─────────────┘
             │
             │ Jenkins Agent Connection
             ▼
┌──────────────────────────┐
│     Jenkins Worker       │
│                          │
│  - Git                   │
│  - Docker                │
│  - AWS CLI               │
│  - kubectl               │
│  - EKS Deployment        │
└──────────────────────────┘
```

---

# 🔄 CI/CD Pipeline

The Jenkins pipeline automates the application deployment process.

## Pipeline Flow

```text
GitHub
   ↓
Jenkins Controller
   ↓
Jenkins Worker
   ↓
Checkout Source Code
   ↓
Build Docker Image
   ↓
Push Image to Docker Hub
   ↓
Deploy to Amazon EKS
   ↓
Verify Kubernetes Deployment
   ↓
Application Running
```

## Pipeline Stages

### 1. Checkout

The Jenkins Worker checks out the latest application source code from GitHub.

### 2. Docker Build

The Node.js application is packaged into a Docker image.

```bash
docker build -t task-management-app .
```

### 3. Push Image

The Docker image is pushed to Docker Hub.

### 4. Kubernetes Deployment

Jenkins applies the Kubernetes manifests:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### 5. Deployment Verification

The pipeline verifies the application:

```bash
kubectl get pods
kubectl get services
```

---

# 🐳 Docker Containerization

The Node.js application is containerized using Docker.

Example:

```bash
docker build -t task-management-app .
```

The application runs inside a container on:

```text
Port: 3000
```

The container image is pushed to Docker Hub and used by the Kubernetes deployment.

## Docker Hub Screenshot

![Docker Image](./Screenshots/eks_dockerhub.png)

---

# ☸️ Amazon EKS Deployment

The application is deployed to an Amazon EKS cluster.

## Kubernetes Components

* Namespace
* Deployment
* Pod
* Service
* LoadBalancer

Deployment flow:

```text
Kubernetes Namespace
        ↓
Kubernetes Deployment
        ↓
Application Pod
        ↓
Kubernetes Service
        ↓
AWS Load Balancer
```

The application is externally accessible through the LoadBalancer service.

---

# 🗄️ Amazon RDS MySQL Integration

The Node.js application uses Amazon RDS MySQL for persistent task data.

## Database Flow

```text
Node.js Application
        ↓
MySQL Client
        ↓
Amazon RDS MySQL
        ↓
taskdb Database
        ↓
tasks Table
```

The application can:

* Fetch tasks
* Create tasks
* Update tasks
* Delete tasks

Example:

```bash
curl http://<LOAD_BALANCER_URL>/tasks
```

Successful response:

```json
[]
```

An empty array indicates that the application successfully connected to the database, but there are currently no task records.

## RDS Screenshot

![Amazon RDS Database](./Screenshots/eks-rds.png)

---

# 🪣 Amazon S3 Application Logging

The application uploads logs to Amazon S3.

Example S3 location:

```text
s3://ekslogsbucketazmi/application-logs/
```

Logs are organized by date:

```text
application-logs/
└── 2026-07-26/
    ├── application-log-1.log
    ├── application-log-2.log
    └── application-log-3.log
```

## Logging Flow

```text
Node.js Application
        ↓
Application Logger
        ↓
AWS SDK
        ↓
AmazonEKSNodeRole
        ↓
s3put IAM Policy
        ↓
Amazon S3
```

The application uses temporary AWS credentials provided through the IAM role attached to the EKS worker node.

No AWS access keys are hardcoded inside the application.

## S3 Screenshot

![Amazon S3 Application Logs](./Screenshots/eks-s3logs.png)

---

# 🔐 IAM Security

The project uses IAM roles and policies for AWS access.

The EKS worker node uses:

```text
AmazonEKSNodeRole
```

The role contains the required S3 permission:

```text
s3:PutObject
```

The S3 resource is restricted to:

```text
arn:aws:s3:::ekslogsbucketazmi/*
```

## IAM Flow

```text
Application Pod
      ↓
EKS Worker Node
      ↓
AmazonEKSNodeRole
      ↓
s3put Policy
      ↓
s3:PutObject
      ↓
Amazon S3
```

This allows the application to upload logs without storing long-term AWS access keys.

---

# 🔑 EKS Access Entry

The IAM role used by the Jenkins EC2 instance was granted access to the EKS cluster through an EKS Access Entry.

This allows Jenkins to execute Kubernetes commands such as:

```bash
kubectl get pods
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl rollout status deployment
```

The flow is:

```text
Jenkins EC2
    ↓
IAM Role
    ↓
EKS Access Entry
    ↓
Amazon EKS
    ↓
kubectl
```

This access is separate from the IAM role used by the application for S3 access.

---

# 🌐 Application Verification

The application is exposed through an AWS Load Balancer.

Example:

```bash
curl http://<LOAD_BALANCER_URL>/tasks
```

Successful response:

```json
[]
```

This confirms that:

* The Load Balancer is reachable
* The Kubernetes Service is working
* The Node.js application is running
* The application can connect to RDS
* The API request is successfully processed

## Application Browser Screenshot

![Application Running on Amazon EKS](./Screenshots/eks-browser.png)

---

# 🧪 Testing and Verification

## Check Kubernetes Pods

```bash
kubectl get pods -n task-management
```

Expected:

```text
NAME                                  READY   STATUS
task-management-app-xxxxx             1/1     Running
```

## Check Kubernetes Services

```bash
kubectl get svc -n task-management
```

## Check Application Logs

```bash
kubectl logs -n task-management <POD_NAME>
```

## Test Application API

```bash
curl http://<LOAD_BALANCER_URL>/tasks
```

## Verify S3 Logs

```bash
aws s3 ls s3://ekslogsbucketazmi/application-logs/ --recursive
```

---

# 🛠️ Troubleshooting

## S3 Access Denied

The application initially received:

```text
AccessDenied
```

The root cause was that the IAM policy did not specify the correct S3 bucket resource.

The correct resource was:

```text
arn:aws:s3:::ekslogsbucketazmi/*
```

After adding the correct bucket ARN, the application was able to upload logs successfully.

### Key Lesson

IAM permissions require both:

```text
Correct Action
      +
Correct Resource
```

Example:

```text
Action:
s3:PutObject

Resource:
arn:aws:s3:::ekslogsbucketazmi/*
```

---

# 📂 Project Structure

```text
.
├── Dockerfile
├── Jenkinsfile
├── package.json
├── package-lock.json
│
├── src/
│   ├── app.js
│   ├── db.js
│   ├── logger.js
│   └── routes/
│       └── tasks.js
│
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── namespace.yaml
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── modules/
│
├── ansible/
│   ├── inventory
│   ├── playbooks/
│   └── roles/
│
├── .gitignore
│
└── Screenshots/
    ├── eks-browser.png
    ├── eks-rds.png
    ├── eks-s3logs.png
    ├── eks_dockerhub.png
    └── eks_jenkins.png
```

---

# 🔒 Secrets Management

Sensitive files such as Kubernetes Secret manifests containing real credentials should not be committed to GitHub.

Example:

```text
k8s/
├── secret.yml
└── secret.example.yml
```

The real secret file should be added to `.gitignore`:

```gitignore
k8s/secret.yml
```

Only a template containing placeholder values should be committed.

Example:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: task-management-secret
type: Opaque
stringData:
  DB_HOST: "your-rds-endpoint"
  DB_USER: "your-db-user"
  DB_PASSWORD: "your-db-password"
  DB_NAME: "taskdb"
```

---

# 📈 Future Improvements

* Add HTTPS using AWS Certificate Manager
* Add Route 53 custom domain
* Use Kubernetes Ingress
* Implement Horizontal Pod Autoscaler
* Add Prometheus and Grafana monitoring
* Add centralized logging
* Use AWS Secrets Manager
* Use Kubernetes Secrets securely
* Implement pod-level IAM permissions using EKS Pod Identity or IRSA
* Add Docker image security scanning
* Add automated rollback in Jenkins
* Implement blue-green or canary deployments
* Configure Terraform remote state
* Deploy a multi-node production EKS architecture

---

# 🎓 Key Learning Outcomes

This project provided hands-on experience with:

* Infrastructure as Code using Terraform
* AWS VPC and networking
* EC2 provisioning
* Ansible server configuration
* Jenkins Controller–Worker architecture
* CI/CD pipeline automation
* Docker containerization
* Docker Hub image management
* Kubernetes deployments
* Amazon EKS
* AWS Load Balancers
* Amazon RDS MySQL
* Amazon S3
* IAM roles and policies
* EKS Access Entries
* AWS CLI
* kubectl
* Application troubleshooting
* Cloud-native architecture

---

# 👨‍💻 Author

**Abadur Rahaman Azmi**

Cloud & DevOps Engineer

### Skills Demonstrated

`AWS` · `Terraform` · `Ansible` · `Jenkins` · `Docker` · `Kubernetes` · `Amazon EKS` · `Amazon RDS` · `Amazon S3` · `IAM` · `Linux` · `Git`

---


