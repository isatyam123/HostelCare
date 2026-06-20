//modules import
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//file import
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const complainRoutes = require("./routes/submit");
const updateRoutes = require("./routes/update");
const connectToMongoDB = require("./db/dbConnect");

require("dotenv").config();
const PORT = process.env.PORT || 5500;
const app = express();
const socket = require("socket.io");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/complain", complainRoutes);
app.use("/api/update", updateRoutes);

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);

      // Initialize Socket.IO server here
        const io = socket(server, {
          cors: {
            origin: "http://localhost:3000",
            credentials: true,
          },
        });

      global.onlineUsers = new Map();

      io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
          onlineUsers.set(userId, socket.id);
        });

        socket.on("send-msg", (data) => {
          const sendUserSocket = onlineUsers.get(data.to);
          if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
          }
        });
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
