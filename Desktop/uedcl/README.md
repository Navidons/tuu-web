# UEDCL Transformer Management System

A web application for managing transformer commissioning, inspection, and fault forms for Uganda Electricity Distribution Company Limited.

## Features

- Transformer commissioning form submission and management
- Transformer inspection form submission and management
- Transformer fault reporting and tracking
- RESTful API for form data CRUD operations
- MySQL database integration
- Database management tools for schema maintenance

## API Endpoints

### Commissioning Forms
- `GET /api/forms/commissioning` - Get all commissioning forms or filter by ID/transformer ID
- `POST /api/forms/commissioning` - Submit a new commissioning form
- `PUT /api/forms/commissioning` - Update an existing commissioning form
- `DELETE /api/forms/commissioning` - Delete a commissioning form

### Inspection Forms
- `GET /api/forms/inspection` - Get all inspection forms or filter by ID/transformer ID
- `POST /api/forms/inspection` - Submit a new inspection form
- `PUT /api/forms/inspection` - Update an existing inspection form
- `DELETE /api/forms/inspection` - Delete an inspection form

### Fault Forms
- `GET /api/forms/fault` - Get all fault forms or filter by ID/transformer ID/status
- `POST /api/forms/fault` - Submit a new fault form
- `PUT /api/forms/fault` - Update an existing fault form
- `DELETE /api/forms/fault` - Delete a fault form

### Database Management
- `GET /api/db/status` - Check database connection and table structure
- `GET /api/db/fix-schema` - Check and fix database schema issues
- `GET /api/db/reinit` - Reinitialize the database (drops and recreates all tables)

## Database Schema

The application uses the following tables:
- `transformers` - Stores transformer information (serial numbers, ratings, locations)
- `users` - Stores user information for technicians, supervisors, etc.
- `teams` - Defines maintenance and operational teams
- `team_members` - Tracks which users belong to which teams
- `commissioning_forms` - Stores transformer commissioning data
- `inspection_forms` - Stores transformer inspection data
- `fault_forms` - Stores transformer fault reports
- `maintenance_records` - Tracks maintenance activities
- `settings` - Application configuration settings

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env.local`:
```
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

4. Set up the database:
   - Option 1: Let the application initialize the database automatically on startup
   - Option 2: Manual setup using provided SQL scripts:
     ```bash
     # Using MySQL command line
     mysql -u your_db_user -p < db/schema.sql
     mysql -u your_db_user -p < db/seed.sql  # Optional - adds sample data
     ```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Administration

For database administration, visit `/admin/database` in your browser. This page provides tools to:
- Check database connection status
- View table structures
- Fix schema issues automatically
- Reinitialize the database if needed

## Troubleshooting Database Issues

If you encounter issues with form submissions or database connectivity:

1. Visit `/admin/database` in your browser
2. Check the database connection status
3. If tables are missing or have incorrect schema, use the "Fix Schema" button
4. For persistent issues, you can manually run the SQL scripts in the `db` folder:
   ```bash
   mysql -u your_db_user -p < db/schema.sql
   ```
5. Alternatively, use the "Reinitialize Database" button (warning: this will clear all data)

## Technologies
- Next.js 14 (App Router)
- React
- TypeScript
- MySQL
- Tailwind CSS
- Shadcn/UI
