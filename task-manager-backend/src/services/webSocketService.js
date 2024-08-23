const WebSocket = require('ws');

class WebSocketService {
  start(port) {
    const wss = new WebSocket.Server({ port });

    wss.on('connection', ws => {
      ws.on('message', message => {
        // Handle incoming messages and broadcast updates
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });
    });
  }
}

module.exports = WebSocketService;
