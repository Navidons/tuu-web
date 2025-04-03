# UEDCL Database Setup

This directory contains the database schema and setup scripts for the UEDCL Transformer Maintenance System.

## Database Schema

The `schema.sql` file contains the complete database schema with tables for:

- Transformers
- Users/Technicians
- Teams
- Team Members
- Commissioning Forms
- Inspection Forms
- Fault Forms
- Maintenance Records
- System Settings

## Setup Instructions

### Prerequisites

- MySQL server installed and running
- Node.js installed

### Setting up the database

1. Make sure your MySQL server is running
2. Create a `.env.local` file in the project root with your database credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=uedcl
```

3. Run the database setup script:

```bash
npm run db:setup
```

This will:
- Create the `uedcl` database if it doesn't exist
- Create all the necessary tables
- Set up initial data and indexes

### Manually running the SQL

If you prefer to run the SQL manually:

1. Connect to your MySQL server:
```bash
mysql -u root -p
```

2. Run the SQL commands:
```bash
source /path/to/schema.sql
```

## Form Submissions

The API endpoints for form submissions are:

- `/api/forms/commissioning` - For transformer commissioning forms
- `/api/forms/inspection` - For transformer inspection forms
- `/api/forms/fault` - For transformer fault reports

Each endpoint accepts POST requests with the form data and validates required fields before saving to the database. 