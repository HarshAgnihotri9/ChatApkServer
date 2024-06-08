"use strict";

import express from "express";
import { Server as SocketIOServer } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import http from 'http';

dotenv.config();

import router from "./Routes/Userrouter.js";

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/user", router);

app.get("/", (req, res) => {
  res.send("WELCOME TO USER API");
});

const port = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected!");

    // Start the server after the database is connected
    const server = http.createServer(app);
    const io = new SocketIOServer(server);

    // Socket.io setup
    let activeUsers = [];

    io.on('connection', (socket) => {
      console.log('a user connected:', socket.id);

      // Handle user joining
      socket.on('join', (username) => {
        const user = { id: socket.id, username };
        activeUsers.push(user);
        io.emit('activeUsers', activeUsers);
        console.log(`${username} joined the chat`);
      });

      // Handle incoming messages
      socket.on('message', (msg) => {
        io.emit('message', msg);
      });

      // Handle user disconnecting
      socket.on('disconnect', () => {
        activeUsers = activeUsers.filter(user => user.id !== socket.id);
        io.emit('activeUsers', activeUsers);
        console.log('user disconnected:', socket.id);
      });
    });

    server.listen(port, () => {
      console.log(`Server started on port no. ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
