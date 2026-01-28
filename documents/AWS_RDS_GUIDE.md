# How to Set Up AWS RDS (Database) for Free

Since you want to use AWS for everything, here is how to create a **Free** database using **AWS RDS**.

## Step 1: Create the Database
1.  Log into **[AWS Console](https://console.aws.amazon.com)**.
2.  Search for **"RDS"** in the top bar.
3.  Click **"Create database"**.
4.  **Choose a database creation method**: Select **"Standard create"**.
5.  **Engine options**: Select **"PostgreSQL"**.
6.  **Templates**: Select **"Free tier"** (Important!).
7.  **Settings**:
    -   **DB instance identifier**: `gogo-db`
    -   **Master username**: `postgres`
    -   **Master password**: Create a password (e.g., `MySecurePassword123`)
8.  **Connectivity**:
    -   **Public access**: Select **"Yes"** (So Amplify can reach it).
    -   **VPC security group**: Select "Create new" → Name it `gogo-db-sg`.
9.  Click **"Create database"** (at the bottom).
10. Wait 5-10 minutes until Status is **"Available"**.

## Step 2: Get Your Connection String
1.  Click on your new database (`gogo-db`).
2.  Look for **"Endpoint"** (it looks like `gogo-db.abc12345.us-east-1.rds.amazonaws.com`).
3.  Your **DATABASE_URL** is:
    ```
    postgres://postgres:YOUR_PASSWORD@YOUR_ENDPOINT:5432/postgres
    ```
    *Replace `YOUR_PASSWORD` and `YOUR_ENDPOINT` with your real values.*

## Step 3: Add to AWS Amplify
1.  Go to **Amplify Console** → your app → **Hosting** → **Environment variables**.
2.  Add:
    -   Key: `DATABASE_URL`
    -   Value: (The URL you created in Step 2)
    -   Key: `JWT_SECRET`
    -   Value: (A random long string)

## Step 4: Initialize the Database
Since this is a new empty database, you need to create the tables.
1.  Install a tool like **pgAdmin** or **DBeaver** on your laptop.
2.  Connect to your database using the URL from Step 2.
3.  Run the contents of the file `src/migrations/001_initial_cms_tables.sql` in the SQL editor.

✅ **Done!** Your CMS now saves to AWS RDS.
