# 🏗️ AWS Infrastructure Provisioning Using Terraform Modules

## 📌 Project Overview

This repository contains reusable **Terraform modules** for automating AWS infrastructure provisioning using Infrastructure as Code (IaC).

The project demonstrates modular Terraform design by creating reusable components for:

- AWS VPC networking
- Security Groups
- EC2 Instance provisioning
- Remote Terraform state management using S3 backend

The goal of this project is to build scalable, maintainable, and reusable cloud infrastructure using Terraform best practices.

---

# 🏗️ Architecture Overview

```
                 Terraform Configuration

                         |
                         |
                         v

                 Terraform Modules

        --------------------------------
        |              |               |
        v              v               v

    VPC Module   Security Module   EC2 Module


        |              |               |

        --------------------------------

                         |
                         v

                    AWS Cloud

        --------------------------------

             VPC Infrastructure

             Public Subnets

             Security Groups

             EC2 Instances


```

---

# 🛠️ Technologies Used

## Cloud Platform

- Amazon Web Services (AWS)


## Infrastructure as Code

- Terraform


## AWS Services

- Amazon VPC
- Subnets
- Route Tables
- Internet Gateway
- Security Groups
- Amazon EC2
- Amazon S3


## DevOps Tools

- Git
- GitHub
- Linux


---

# 📂 Repository Structure

```
terraform-modules/

│
├── vpc_module/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── security_module/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── instance_module/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── backend.tf
│
├── .gitignore
│
└── README.md

```

---

# 📦 Terraform Modules

## 1. VPC Module

Creates AWS networking infrastructure.

Resources created:

- VPC
- Public Subnets
- Private Subnets
- Internet Gateway
- Route Tables
- Route Associations


Example architecture:

```
                 AWS VPC

                    |

        -------------------------

        |                       |

 Public Subnet            Private Subnet

        |

        |

     EC2 Instances

```

---

# 🔐 2. Security Group Module

Creates and manages EC2 security groups.

Configured rules:

- SSH access (Port 22)
- HTTP access (Port 80)
- Application ports


Benefits:

- Reusable security configuration
- Centralized network rules
- Easy modification

---

# 🖥️ 3. EC2 Instance Module

Creates EC2 instances using reusable Terraform code.

Features:

- AMI selection
- Instance type configuration
- Key pair configuration
- Subnet association
- Security group attachment


Deployment flow:

```
Terraform

   |

EC2 Module

   |

AWS EC2 Instance

```

---

# ☁️ Terraform Remote Backend

The project uses an S3 backend for storing Terraform state.

Configuration:

```hcl
terraform {
 backend "s3" {
   bucket = "terraform-state-bucket"
   key    = "terraform.tfstate"
   region = "ap-south-1"
 }
}
```

Benefits:

- Centralized state storage
- Team collaboration
- State backup
- Improved security

---

# 🚀 Terraform Workflow

## Initialize Terraform

```bash
terraform init
```

---

## Validate Configuration

```bash
terraform validate
```

---

## Create Execution Plan

```bash
terraform plan
```

---

## Deploy Infrastructure

```bash
terraform apply
```

---

## Destroy Infrastructure

```bash
terraform destroy
```

---

# 🔄 Module Usage Flow

```
Root Configuration

        |

        |

Calls Modules


        |

--------------------------------

        |

        |

 VPC Module

 Security Module

 EC2 Module


        |

        |

AWS Infrastructure

```

---

# 📸 Infrastructure Output

Example AWS infrastructure created:

- Custom VPC
- Multiple Subnets
- Security Groups
- EC2 Instances


---

# 🔥 Key Features

✅ Reusable Terraform modules  
✅ Infrastructure as Code approach  
✅ AWS automated provisioning  
✅ Modular architecture  
✅ Remote state management  
✅ Scalable cloud infrastructure design  
✅ Version-controlled infrastructure  


---

# 📚 Learning Outcomes

Through this project, I learned:

- Writing reusable Terraform modules
- Managing AWS infrastructure using code
- Designing AWS networking architecture
- Implementing Terraform remote backend
- Creating modular cloud infrastructure
- Following Infrastructure as Code practices


---

# 🔮 Future Improvements

Future enhancements:

- Add DynamoDB state locking
- Add Terraform workspace support
- Integrate CI/CD pipeline with Jenkins
- Add Terraform security scanning
- Add AWS EKS module
- Add Auto Scaling Groups
- Add Load Balancer module


---

# 👨‍💻 Author

**Abadur Rahaman Azmi**

DevOps Engineer


## Skills

AWS | Terraform | Docker | Kubernetes | Jenkins | Ansible | Linux | CI/CD
