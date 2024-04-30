// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

// Serve static files (e.g., HTML, JavaScript, CSS)
app.use(express.static('public'));

let clients = 0;

// Handle socket connections
io.on('connection', (socket) => {
  clients += 1;
  console.log('New client connected. Total clients:', clients);

  socket.on('disconnect', () => {
    clients -= 1;
    console.log('Client disconnected. Total clients:', clients);
  });

  // Handle custom game events
  socket.on('playerMovement', (data) => {
    // Broadcast player movement to all other clients
    socket.broadcast.emit('playerMovement', data);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
