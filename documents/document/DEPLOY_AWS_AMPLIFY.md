# AWS Amplify Deployment Guide

This guide explains how to deploy the GoGo Web application to **AWS Amplify**.

## Prerequisites
1.  **AWS Account**.
2.  **GitHub Repository** with the latest code.
3.  **AWS RDS (PostgreSQL)** database running (or use a local/docker DB for dev).
4.  **AWS S3 Bucket** created.
5.  **AWS User Pool (Cognito)** created.

## Step 1: Connect to Amplify
1.  Log in to the **AWS Console**.
2.  Go to **AWS Amplify**.
3.  Click **Create new app**.
4.  Select **GitHub** as the source.
5.  Authorize AWS to access your GitHub account.
6.  Select the **GOGO** repository and the `main` (or `phase-3-complete`) branch.

## Step 2: Build Settings
Amplify should auto-detect Next.js. Ensure the build settings look like this:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Step 3: Environment Variables
Go to **Advanced settings** -> **Environment variables** and add the following:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | RDS Connection String | `postgres://user:pass@endpoint:5432/dbname?sslmode=require` |
| `DB_SSL` | Enable SSL for RDS | `true` |
| `AWS_REGION` | AWS Region | `us-east-1` |
| `S3_BUCKET` | S3 Bucket Name | `gogo-uploads` |
| `COGNITO_USER_POOL_ID` | Cognito User Pool ID | `us-east-1_xxxxxx` |
| `NEXT_PUBLIC_SITE_URL` | Production URL | `https://main.dxxxx.amplifyapp.com` |
| `CONTENTFUL_SPACE_ID` | Contentful Space ID | `...` |
| `CONTENTFUL_ACCESS_TOKEN`| Contentful Access Token | `...` |

## Step 4: Deploy
1.  Click **Next** and **Save and Deploy**.
2.  Amplify will provision the build environment, checkout code, build, and deploy.

## Troubleshooting
-   **Build Failures**: Check the Build logs. Common issues are missing environment variables or type errors.
-   **Database Usage**: Ensure "Public Access" is enabled on RDS *OR* verify Amplify has VPC access (VPC access requires "Amplify Gen 2" or specific VPC configuration). *Simpler:* Allow 0.0.0.0/0 on RDS Security Group for initial testing (Restrict later).

## Post-Deployment
-   Your app will be live at the Amplify-provided URL.
-   Admin login now requires a valid Cognito JWT token to be sent to `/api/admin/auth`.
