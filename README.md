# React DevOps CI/CD Pipeline on AWS

Production-style DevOps pipeline that builds, containerizes, and deploys a React application to **AWS ECS (Fargate)** using **Jenkins**, **Docker**, and **Amazon ECR**.
The project demonstrates a complete **CI/CD workflow**, container lifecycle management, and infrastructure integration with AWS services.

---

# Project Overview

This repository showcases an end-to-end **DevOps workflow for a modern containerized frontend application**.

The pipeline automatically:

1. Pulls the source code from GitHub
2. Installs project dependencies
3. Builds a Docker image of the application
4. Pushes the image to **Amazon Elastic Container Registry (ECR)**
5. Deploys the new version to **Amazon Elastic Container Service (ECS Fargate)**

The entire process is orchestrated through **Jenkins pipelines**.

This project simulates a **real production deployment flow**, focusing on container-based delivery and automated deployments.

---

# Architecture

```
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Jenkins Pipeline
    │
    ├── Install Dependencies
    ├── Build Docker Image
    ├── Push Image to Amazon ECR
    │
    ▼
Amazon ECS (Fargate)
    │
    ▼
React Application
```

---

# Technologies & Tools

## CI/CD

* Jenkins
* GitHub

## Containerization

* Docker
* Dockerfile (multi-stage build)
* Docker image versioning

## Cloud Platform

* AWS

## AWS Services

* Amazon ECS (Fargate)
* Amazon ECR
* AWS IAM

## Application

* React
* Vite
* Nginx (container runtime server)

## Infrastructure Concepts

* Container orchestration
* Image registry management
* CI/CD automation
* Immutable deployments
* Versioned container releases

---

# CI/CD Pipeline Stages

The Jenkins pipeline performs the following stages:

### 1. Install Dependencies

Installs application dependencies using:

```
npm ci
```

This ensures reproducible builds in a clean environment.

---

### 2. Build Docker Image

A multi-stage Docker build is used:

* Stage 1: Node environment builds the React application
* Stage 2: Nginx serves the static build

Benefits:

* Smaller container size
* Production-optimized image
* Separation of build and runtime environments

---

### 3. Push Image to Amazon ECR

The Docker image is tagged and pushed to **Amazon Elastic Container Registry**.

Image format:

```
ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/repository-name:version
```

Example:

```
002574138182.dkr.ecr.eu-central-1.amazonaws.com/react-devops-cloud-dashboard:1.0.63
```

---

### 4. Deploy to Amazon ECS

The pipeline updates the ECS service by:

1. Registering a new **task definition revision**
2. Updating the ECS service
3. Waiting for service stabilization

This ensures the new container version is deployed safely.

---

# Docker Strategy

The application container uses a **multi-stage Docker build**:

**Build stage**

* Node environment
* Compiles React application

**Runtime stage**

* Nginx container
* Serves static production files

Advantages:

* Smaller final image
* Faster deployments
* Reduced attack surface

---

# Security

Security best practices implemented:

* AWS IAM roles for ECS task execution
* Jenkins credentials management
* Private container registry (Amazon ECR)
* Least privilege access configuration

---



# Example Deployment Flow

```
Git Push
   │
   ▼
Jenkins CI Pipeline
   │
   ▼
Docker Image Build
   │
   ▼
Push Image → Amazon ECR
   │
   ▼
ECS Task Definition Update
   │
   ▼
ECS Service Deployment
   │
   ▼
Running Application
```

---

# Author

Panagiotis Beis
