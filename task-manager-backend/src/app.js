const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const WebSocketService = require('./services/webSocketService');

app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// WebSocket Service
const wss = new WebSocketService();
wss.start(8080);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
