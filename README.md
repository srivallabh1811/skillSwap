# SkillSwap skillExchange 

 Turning knowledge into currency through skill exchange  

SkillSwap is a MERN stack based platform that allows users to exchange skills with each other without any monetary cost.

---

##  Problem Statement 

In today’s digital world, most learning platforms are paid and not accessible to everyone.  
Many students and learners are unable to afford expensive courses, even though they are eager to learn new skills.

At the same time, many individuals already possess valuable skills but lack a platform to share and exchange them with others.

---

##  Motivation

The idea behind SkillSwap came from a simple thought:  
**“Why should learning be limited by money when people can learn from each other?”**

During the hackathon, I aimed to build a practical solution to a real-world problem.  
This led to the development of a platform where knowledge can be shared freely and collaboratively.

---

##  Objective

- Enable users to exchange skills without any monetary cost  
- Create a collaborative learning environment  
- Help users connect based on skills and interests  
- Make learning accessible and community-driven  

---

##  Vision

To build a platform where **knowledge becomes currency** and anyone can learn anything by sharing what they know.

---

##  Features

-  User Authentication (JWT)
-  Skill-based User Profiles  
-  Search Functionality  
-  Category-based Filtering  
   Skill Exchange Request System (Backend)  
-  REST API Integration  

---

##  Tech Stack

- **Frontend:** React (Vite)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT, Bcrypt  
- **API Handling:** Axios  

---

##  How It Works

1. User signs up / logs in  
2. Adds skills they can offer and want to learn  
3. Browses other users  
4. Uses search & filter to find relevant users  
5. Sends a skill exchange request  

---

##  Getting Started (Local Setup)

**Prerequisites:** Node.js 20+ and MongoDB (local install, Docker, or a free MongoDB Atlas cluster).

```bash
# Start MongoDB with Docker (skip if you use a local install or Atlas)
docker run -d --name skillswap-mongo -p 27017:27017 mongo:7
```

### 1. Backend

```bash
cd backend
cp .env.example .env      # then edit .env (at least MONGODB_URI and JWT_SECRET)
npm install
npm run dev               # http://localhost:3000
```

### 2. Frontend (in a second terminal)

```bash
cd frontend
cp .env.example .env      # defaults point to http://localhost:3000
npm install
npm run dev               # http://localhost:5173
```

### Environment variables

| File | Variable | Required | Purpose |
|---|---|---|---|
| `backend/.env` | `MONGODB_URI` | Yes | MongoDB connection string |
| `backend/.env` | `JWT_SECRET` | Yes | Secret used to sign login tokens |
| `backend/.env` | `PORT`, `JWT_EXPIRES_IN`, `SESSION_SECRET` | No | Server port (3000), token lifetime (1d), session secret |
| `backend/.env` | `FRONTEND_URL`, `BACKEND_URL`, `CORS_ORIGINS` | No | URLs used for OAuth redirects and CORS |
| `backend/.env` | `EMAIL_USER`, `EMAIL_PASSWORD` | No | Gmail + App Password for login notification emails |
| `backend/.env` | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | No | Enables "Continue with Google" |
| `backend/.env` | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | No | Enables "Continue with GitHub" |
| `frontend/.env` | `VITE_API_URL` | No | REST API URL (default `http://localhost:3000/api`) |
| `frontend/.env` | `VITE_API_BASE_URL` | No | Socket.io URL (default `http://localhost:3000`) |

`.env` files are git-ignored. Never commit real secrets.

---

##  Future Improvements

-  Real-time chat (Socket.io)  
-  AI-based skill matching  
-  Rating & feedback system  
-  User profile page  

---

##  Acknowledgement

Thanks to GeeksforGeeks and my mentors for organizing the hackathon and providing valuable guidance throughout the journey.

---

##  Author

**Rajit Maurya**  
MERN Stack Developer  | Exploring AI 

---

 If you like this project, don't forget to give it a star.....
