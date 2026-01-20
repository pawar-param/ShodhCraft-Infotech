## 📦 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Others:** dotenv, nodemon  


### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or on Atlas)  
- npm (comes with Node.js)  


### ⚡ Run the Project Locally

#### 1. Frontend
```bash
cd app/frontend
npm i
npm run dev


cd app/backend
npm i
node server.js
# or, if you have a dev script:
npm run dev





``` 
backend/
├── node_modules/
├── src/
│   ├── config/                  # DB connection and config files
│   │   └── database.js
│
│   ├── controllers/            # Logic for routes
│   │   ├── applicationController.js   # Handle GET /applications
│   │   └── jobController.js           # Handle POST /jobs, GET /jobs
│
│   ├── middleware/             # Validation, auth, etc.
│   │   └── validateApplication.js
│
│   ├── models/                 # Sequelize/Mongoose models
│   │   ├── Job.js                     # Model for jobs
│   │   └── JobApplication.js         # Model for applications
│
│   └── routes/                 # Express routers
│       ├── applicationRoutes.js      # /applications routes
│       └── jobRoutes.js              # /jobs routes
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── server.js                   # Entry point


```


```

| Method | Endpoint            | Purpose                      |
| ------ | ------------------- | ---------------------------- |
| POST   | `/api/auth/signup`  | Register new user            |
| POST   | `/api/auth/login`   | Login user                   |
| POST   | `/api/applications` | Submit job application       |
| GET    | `/api/applications` | Admin: View all applications |
| GET    | `/api/jobs`         | Get all jobs (user)          |
| POST   | `/api/jobs/create`  | Admin: Create new job        |
| DELETE | `/api/jobs/:id`     | Admin: Delete a job          |
| GET    | `/health`           | Server health check          |


```

