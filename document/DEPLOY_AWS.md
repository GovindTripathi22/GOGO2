# AWS Deployment Guide

This guide explains how to deploy the GoGo Web application to AWS using **App Runner** (for the application) and **RDS** (for the database).

## Prerequisites
1.  **AWS Account**: You need an active AWS account.
2.  **AWS CLI**: Installed and configured (optional, but helpful).
3.  **Domain Name**: Managed via Route53 (optional).

## Step 1: Set up PostgreSQL Database (AWS RDS)
1.  Go to **Amazon RDS** console.
2.  Click **Create database**.
3.  **Engine**: Choose **PostgreSQL**.
4.  **Templates**: Choose **Free tier** or **Production** based on your needs.
5.  **Settings**:
    -   **DB instance identifier**: `gogo-db`
    -   **Master username**: `gogo_user` (or your choice)
    -   **Master password**: Create a strong password.
6.  **Connectivity**:
    -   **Public access**: **No** (Recommended for security). App Runner will connect inside VPC.
    -   **VPC**: Select your default VPC.
7.  **Create database**.
8.  **Wait** for status to become `Available`.
9.  **Note the Endpoint** (e.g., `gogo-db.xxxxxx.us-east-1.rds.amazonaws.com`).

## Step 2: Build & Push Docker Image (AWS ECR)
1.  Go to **Amazon ECR** console.
2.  **Create repository**: Name it `gogo-web`.
3.  Select the repository and click **View push commands**.
4.  Follow the instructions to build and push your image:
    ```powershell
    # Login
    aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account_id>.dkr.ecr.<region>.amazonaws.com

    # Build
    docker build -t gogo-web .

    # Tag
    docker tag gogo-web:latest <account_id>.dkr.ecr.<region>.amazonaws.com/gogo-web:latest

    # Push
    docker push <account_id>.dkr.ecr.<region>.amazonaws.com/gogo-web:latest
    ```

## Step 3: Deploy to AWS App Runner
1.  Go to **AWS App Runner** console.
2.  **Create service**.
3.  **Source**: **Container registry**.
    -   **Provider**: Amazon ECR.
    -   **Image URI**: Browse and select `gogo-web:latest`.
4.  **Deployment settings**: Automatic (deploy on new push).
5.  **Configuration**:
    -   **Runtime**: Env variables. Add the following:
        -   `DATABASE_URL`: `postgresql://gogo_user:PASSWORD@ENDPOINT:5432/postgres?sslmode=require`
        -   `NEXT_PUBLIC_BASE_URL`: `https://your-app-url.awsapprunner.com`
        -   `CONTENTFUL_SPACE_ID`: (Your credentials)
        -   `CONTENTFUL_ACCESS_TOKEN`: (Your credentials)
    -   **Port**: `3000`.
6.  **Create & Deploy**.

## Step 4: Database Schema Setup
Since this is a fresh database, you need to create the table.
The application includes a setup script. Or you can connect via a Bastion host / SQL Client and run:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  fleet_size TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  email_status TEXT DEFAULT 'pending',
  email_error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
