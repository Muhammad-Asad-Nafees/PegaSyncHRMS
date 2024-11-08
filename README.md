# TECH_STACK_ENHANCEMENT

This project is a Node.js-based system that uses TypeScript, Sequelize, and possibly Express.js. Below is an explanation of the project's structure and instructions on how to set it up.

## Table of Contents

- Project Structure
- Installation
- Running the Project
- Available Scripts
- Environment Variables
- Database Setup
- Useful Commands

## Project Structure

The folder structure is as follows:
```bash
TECH_STACK_ENHANCEMENT/
│
├── src/
│   ├── controllers/
│   │   └── userController.ts  # User-related API controller
│   │
│   ├── database/
│   │   ├── config/            # Sequelize configuration files
│   │   ├── migrations/        # Database migration files
│   │   ├── models/            # Sequelize models
│   │   ├── seeders/           # Seed data for the database
│   │   └── index.ts           # Entry point to initialize the database
│   │
│   ├── lib/
│   │   └── tool.ts            # Utility functions
│   │
│   ├── routes/
│   │   └── v1.ts              # API routes for version 1
│   │
│   └── app.ts                 # Main application entry point
│
├── .gitattributes              # Git configuration file
├── .gitignore                  # Specifies files to ignore in version control
├── .sequelizerc                # Sequelize configuration
├── nodemon.json                # Nodemon configuration for live-reloading
├── package-lock.json           # Dependency tree lock file
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration file
└── usefull_commands.txt        # A list of useful commands for development
```

## Key Folders and Files

- src/controllers/userController.ts: This is where user-related request handling is implemented.
- src/database: Contains all the database-related files.
  - ```config/:``` Contains configuration for connecting to the database.
  - ```migrations/:``` Holds all database migration scripts.
  - ```models/:``` Sequelize models that represent tables in the database.
  - ```seeders/:``` Used to populate the database with initial data.
  - ```index.ts:``` Entry point for setting up and synchronizing the database.
- src/lib/tool.ts: Contains utility functions used across the project.
- src/routes/v1.ts: Defines API routes for version 1 of the application.
- app.ts: The main entry point that starts the server.

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/TECH_STACK_ENHANCEMENT.git
   cd TECH_STACK_ENHANCEMENT
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Make sure to configure your environment variables as specified in the next section.**

## Running the Project

To run the project in development mode, use:
  ```bash
  npm start
  ```
The app will automatically reload if you make changes to any of the source files.

## Environment Variables

You'll need to set up environment variables for things like the database connection. Create a .env file in the root directory with the following fields:
  ```bash
  DB_HOST=your_database_host
  DB_USER=your_database_user
  DB_PASSWORD=your_database_password
  DB_NAME=your_database_name
  PORT=your_app_port
  ```

## Database Setup

This project uses Sequelize for database management. You can use the following commands to manage the database:

1. **Run Migrations:**

   ```bash
   npx sequelize db:migrateT
   ```

2. **Seed the Database:**

   ```bash
   npx sequelize db:seed:all
   ```

  ## Useful Commands

The file ```usefull_commands.txt``` includes additional shell commands or scripts that may be helpful during development or deployment.
