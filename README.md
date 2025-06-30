# 🧰 Dev Toolbox – by Ishan Tripathi

Dev Toolbox is a feature-rich full stack web application built to streamline a developer’s daily workflow. It offers tools like JSON Formatter, Base64 Encoder/Decoder, and a MongoDB-backed JSON History Viewer, with a clean UI and dark mode support.

🔗 **Live Frontend:** [https://dev-toolbox-ishantripathi.netlify.app](https://dev-toolbox-ishantripathi.netlify.app)

---

## 🖥️ Project Overview

- ⚛️ **Frontend:** React (Vite), Ant Design, React Hot Toast
- 🚀 **Backend:** Node.js + Express
- 🗃️ **Database:** MongoDB Atlas
- 🌐 **Deployment:** Frontend on **Netlify**, backend to be deployed on Render/Heroku/your server

---

## 📦 Libraries & Dependencies

### 🔧 Backend (Node.js + Express)
- `express` – Web server
- `cors` – CORS handling
- `dotenv` – Load environment variables
- `mongodb` – MongoDB client
- `nodemon` – Auto-restart server in development



### 🌐 Frontend (React + Vite)
- `react` & `react-dom` – UI library
- `vite` – Fast frontend build tool
- `antd` – Ant Design component library
- `react-hot-toast` – Toast notifications
- `react-router-dom` – Routing 

  

## Current Features
- 🧹 JSON Formatter
- 🔐 Base64 Encoder/Decoder
- 🕘 JSON History Viewer (MongoDB-backed)
- 💡Toggle Dark Button

## Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas URI (free account at mongodb.com)

## Setup Steps
1. Clone repository: `git clone https://github.com/Reallyishan009/dev-toolbox-ishantripathi.git`
2. Navigate to project: `cd dev-toolbox-ishantripathi`
3. Create `.env` file in `server/` folder with:
   - `MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority`
   - `PORT=5050`
4. Start backend server:
   - `cd server`
   - `npm install`
   - `npm run dev` (or `nodemon index.js`)
   - Server runs on: http://localhost:5050
5. Start frontend client (new terminal):
   - `cd client`
   - `npm install`
   - `npm run dev`
   - Client runs on: http://localhost:5173

## Future Improvements

### 🔐 Authentication System
- Implement JWT-based user login/signup
- Enable user-specific history
- Add rate limits

### 🎨 Enhanced UI/UX
- Add tooltips and transitions
- Implement keyboard shortcuts
- Add theme persistence

### 🐳 Full Docker Support
- Dockerize frontend and backend
- Ensure consistent local and cloud development environments

### ⚙️ Performance Optimization
- Add lazy loading for tools
- Implement gzip compression
- Minimize JS bundle size for faster performance

### 🧰 More Developer Tools
- UUID Generator
- Timestamp ↔ Human date converter
- Regex Tester
- Curl/HTTP Request Builder
- URL Encoder/Decoder

### 🧪 Testing & CI/CD
- Unit & integration tests with Jest and Supertest
- GitHub Actions for automated linting, testing, and deployment

### 📊 Analytics & Feedback
- Integrate PostHog or LogRocket for usage analytics
- Create feedback form for user suggestions

### 🔒 Security Enhancements
- Rate limiting
- CORS origin whitelisting
- Helmet implementation
- Audit logging

## Author
- **Ishan Tripathi**
- LinkedIn :[https://www.linkedin.com/in/ishan-tripathi-891b31229/]
