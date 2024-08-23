const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

// This is a WebSocket connection
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

//api routes
app.post('/api/tasks', (req, res) => {
  // Logic to create a new task
  res.status(201).send('Task created');
});

app.get('/api/tasks/:id', (req, res) => {
  // Logic to get a task by ID
  res.status(200).send('Task details');
});

app.put('/api/tasks/:id', (req, res) => {
  // Logic to update a task
  res.status(200).send('Task updated');
});

app.delete('/api/tasks/:id', (req, res) => {
  // Logic to delete a task
  res.status(200).send('Task deleted');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
