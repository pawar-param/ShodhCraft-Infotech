# React + Vite

A full-stack web application built with **React (frontend)**, **Node.js/Express (backend)**, and **MongoDB (database)**.  

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





This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```

folder Strucutre

xyz-company-website/
├── public/
│   └── index.html
├── src/
│   ├── assets/               # Images, fonts, etc.
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── pages/                # Main page components (for routing)
│   │   ├── Home.jsx
│   │   ├── Career.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── routes/               # Route configuration
│   │   └── AppRoutes.jsx
│   ├── styles/               # Global or module styles (CSS/SCSS)
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point (for Vite)
│   └── config/               # Optional: API URLs, site config
├── .gitignore
├── package.json
├── README.md
└── vite.config.js (or webpack config)
 
```