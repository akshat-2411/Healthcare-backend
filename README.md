project: "🏥 Healthcare Backend"

description: >
  This is a Node.js + Express + PostgreSQL backend for a healthcare management system.
  It provides authentication, user management, and APIs to support a healthcare-related application.

tech_stack:
  - Node.js (runtime)
  - Express.js (web framework)
  - Sequelize ORM (PostgreSQL database connection)
  - PostgreSQL (database)
  - JWT Authentication

project_structure:
  root: healthcare-backend/
  directories:
    - src/
      - app.js: "Entry point"
      - models/: "Sequelize models"
      - routes/: "Express routes"
      - controllers/: "Route handlers"
      - middleware/: "Auth & other middlewares"
  files:
    - .env: "Environment variables (not pushed to git)"
    - package.json
    - README.md

environment_variables:
  - PORT: 4000
  - DATABASE_URL: "postgres://dbuser:dbpass@localhost:5432/healthdb"
  - JWT_SECRET: your_super_secret_key_here
  - JWT_EXPIRES_IN: 1h
  - NODE_ENV: development

setup_and_installation:
  - step: Clone the repo
    commands:
      - git clone https://github.com/akshat-2411/Healthcare-backend.git
      - cd Healthcare-backend

  - step: Install dependencies
    commands:
      - npm install

  - step: Setup PostgreSQL
    sql_commands:
      - CREATE DATABASE healthdb;
      - CREATE USER dbuser WITH PASSWORD 'dbpass';
      - GRANT ALL PRIVILEGES ON DATABASE healthdb TO dbuser;

  - step: Run the development server
    commands:
      - npm run dev
    expected_output:
      - DB connected
      - Server running on port 4000

api_endpoints:
  authentication:
    - POST /api/auth/register: "Register new user"
    - POST /api/auth/login: "Login & get JWT"

  patients:
    - POST /api/patients/: "Add new patient"
    - GET /api/patients/: "Get all patients"
    - GET /api/patients/:id: "Get specific patient"
    - PUT /api/patients/:id: "Update patient"
    - DELETE /api/patients/:id: "Delete patient"

  doctors:
    - POST /api/doctors/: "Add new doctor"
    - GET /api/doctors/: "Get all doctors"
    - GET /api/doctors/:id: "Get specific doctor"
    - PUT /api/doctors/:id: "Update doctor"
    - DELETE /api/doctors/:id: "Delete doctor"

  patient_doctor_mappings:
    - POST /api/mappings/: "Assign doctor to patient"
    - GET /api/mappings/: "Get all mappings"
    - GET /api/mappings/:patient_id: "Get doctors assigned to patient"
    - DELETE /api/mappings/:id: "Remove doctor from patient"
