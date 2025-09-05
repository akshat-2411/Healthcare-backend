# 🏥 Healthcare Backend

This is a **Node.js + Express + PostgreSQL** backend for a healthcare management system.  
It provides authentication, user management, and APIs to support a healthcare-related application.

---

## ⚙️ Tech Stack
- ⚡ **Node.js** (runtime)  
- 🚀 **Express.js** (web framework)  
- 🗄️ **Sequelize ORM** (PostgreSQL database connection)  
- 🛢️ **PostgreSQL** (database)  
- 🔑 **JWT Authentication**  

---

## 📂 Project Structure

healthcare-backend/
│-- src/
│ ├── app.js # Entry point
│ ├── models/ # Sequelize models
│ ├── routes/ # Express routes
│ ├── controllers/ # Route handlers
│ └── middleware/ # Auth & other middlewares
│-- .env # Environment variables (not pushed to git)
│-- package.json
│-- README.md

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000
DATABASE_URL=postgres://dbuser:dbpass@localhost:5432/healthdb
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=1h
NODE_ENV=development
````

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the repo

```bash
git clone https://github.com/akshat-2411/Healthcare-backend.git
cd Healthcare-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup PostgreSQL

```sql
CREATE DATABASE healthdb;
CREATE USER dbuser WITH PASSWORD 'dbpass';
GRANT ALL PRIVILEGES ON DATABASE healthdb TO dbuser;
```

### 4️⃣ Run the development server

```bash
npm run dev
```

✅ You should see:

```
DB connected
Server running on port 4000
```

---

## 🚀 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login & get JWT   |

### 🧑 Patients

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | `/api/patients/`    | Add new patient      |
| GET    | `/api/patients/`    | Get all patients     |
| GET    | `/api/patients/:id` | Get specific patient |
| PUT    | `/api/patients/:id` | Update patient       |
| DELETE | `/api/patients/:id` | Delete patient       |

### 👨‍⚕️ Doctors

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/doctors/`    | Add new doctor      |
| GET    | `/api/doctors/`    | Get all doctors     |
| GET    | `/api/doctors/:id` | Get specific doctor |
| PUT    | `/api/doctors/:id` | Update doctor       |
| DELETE | `/api/doctors/:id` | Delete doctor       |

### 🔗 Patient-Doctor Mappings

| Method | Endpoint                    | Description                       |
| ------ | --------------------------- | --------------------------------- |
| POST   | `/api/mappings/`            | Assign doctor to patient          |
| GET    | `/api/mappings/`            | Get all mappings                  |
| GET    | `/api/mappings/:patient_id` | Get doctors assigned to a patient |
| DELETE | `/api/mappings/:id`         | Remove doctor from patient        |
