import "./env.js";
import express from "express";
import compression from "compression";
import AuthController from "./controllers/AuthController.js";
import SwapController from "./controllers/SwapController.js";
import UserController from "./controllers/UserController.js";
import ChatController from "./controllers/ChatController.js";
import connectDB from "./controllers/dbController.js";
import sendMail from "./controllers/MailController.js";
import cors from "cors";
import session from "express-session";
import passport from "./passport.js";

// Fail fast with a clear message instead of crashing later on the first request
const requiredEnv = ["MONGODB_URI", "JWT_SECRET"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  console.error("Copy backend/.env.example to backend/.env and fill in the values.");
  process.exit(1);
}

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  'http://localhost:5173',
  'https://skill-swap-henna-mu.vercel.app',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
  ...(process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()) : []),
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
// Served after CORS so the frontend can fetch() avatars (see utils/avatarCache.js)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "skillswap_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//mongo connection
connectDB();

app.use("/api/auth", AuthController);
app.use("/api/users", UserController);
app.use("/api/swaps", SwapController);
app.use("/api/chat", ChatController);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


import { createServer } from "http";
import { Server } from "socket.io";
import Message from "./models/Message.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their private room.`);
  });

  socket.on("sendMessage", async ({ sender, receiver, text }) => {
    try {
      const newMessage = new Message({ sender, receiver, text });
      await newMessage.save();
      
      const emitData = {
        _id: newMessage._id,
        sender,
        receiver,
        text,
        type: newMessage.type,
        swapRequest: newMessage.swapRequest,
        createdAt: newMessage.createdAt,
      };

      // Emit to receiver's room
      io.to(receiver).emit("receiveMessage", emitData);
      
      // Also emit back to sender (optional, but good for confirmation if not optimistic)
      io.to(sender).emit("receiveMessage", emitData);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});