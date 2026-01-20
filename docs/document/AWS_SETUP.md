# AWS Setup Guide for GoGo CMS

This guide explains how to set up the AWS infrastructure required for your CMS.

## 1. Database (AWS RDS) - Required
You need a PostgreSQL database hosted on AWS.

1.  Log in to **AWS Console**.
2.  Search for **RDS** and click **Create database**.
3.  Choose **Standard create** > **PostgreSQL**.
4.  **Templates**: Choose **Free tier** (for testing) or **Production**.
5.  **Settings**:
    *   **DB Instance Identifier**: `gogo-db`
    *   **Master username**: `gogo_admin`
    *   **Master password**: Create a strong password (this is for the database itself, not your login).
6.  **Connectivity**:
    *   **Public access**: Select **Yes** (so you can connect from your computer).
    *   **VPC Security Group**: Create new (allow port 5432).
7.  Click **Create database**.

### Get the Connection URL
Once created (took 5-10 mins), click on the database name.
*   **Endpoint**: `gogo-db.xxxx.us-east-1.rds.amazonaws.com`
*   **Port**: `5432`

Your Connection String (`DATABASE_URL`) format:
`postgres://gogo_admin:YOUR_DB_PASSWORD@ENDPOINT:5432/postgres`

---

## 2. Setup your CMS (Run Migrations)

Now connect your code to this new database.

1.  Open your project `.env.local` file.
2.  Update `DATABASE_URL` with the string from above.
3.  Run the migration command in your terminal:
    ```bash
    # This creates the tables in AWS
    psql "YOUR_DATABASE_URL" -f migrations/001_create_cms_tables.sql
    ```
    *(If you don't have psql, use a tool like pgAdmin or DBeaver to run the SQL file).*

4.  **CRITICAL: Create your Admin User (With Password)**
    Run this SQL command in your database tool:

    ```sql
    INSERT INTO admin_users (email, role, password_hash) 
    VALUES (
      'govindtripathi662@gmail.com', 
      'admin', 
      '$2b$10$BZVyEZj5o0hU2r6Bb8W/lenngCsSoTcDdSaddCQ0xJvwQO5TUEJwO'
    );
    ```

    *   This sets your login email to: `govindtripathi662@gmail.com`
    *   This sets your login password to: `Admin@123`

---

## 3. Email (AWS SES) - OPTIONAL
Since you are using **Password Authentication**, email setup is LESS critical (users check email for magic links, but you log in with password). However, if you want the system to send notifications:

1.  Search for **Amazon Simple Email Service (SES)**.
2.  Go to **Identities** > **Create identity**.
3.  Select **Email address**.
4.  Enter your sender email.
5.  Get SMTP Credentials from "SMTP Settings".

Update your `.env.local` if you use this.

---

## 4. Deploying the Code (AWS App Runner)
To put the website online.

1.  Search for **AWS App Runner**.
2.  **Source**: Source code repository.
3.  **Connect GitHub**: Select your `gogosite` repo.
4.  **Build Settings**:
    *   Runtime: Node.js 18+
    *   Build command: `npm install && npm run build`
    *   Start command: `npm start`
    *   Port: `3000`
5.  **Environment Variables**: Add all your `.env` variables here:
    *   `DATABASE_URL`
    *   `JWT_SECRET`
    *   `NEXT_PUBLIC_BASE_URL` (e.g., https://your-app-url.awsapprunner.com)
6.  Click **Create & Deploy**.

Done! Your site will be live.
