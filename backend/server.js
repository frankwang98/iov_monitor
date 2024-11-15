const express = require('express');

const http = require('http');
const WebSocket = require('ws');
const apiRoutes = require('./services/api');

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(express.json());

// 创建 HTTP 服务器
app.use('/', apiRoutes);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// 创建 WebSocket 服务器并附加到 HTTP 服务器
const wss = new WebSocket.Server({ server });

// 监听 WebSocket 连接事件
wss.on('connection', (ws) => {
    console.log('New client connected');

    // 发送
    ws.send('Welcome to the WebSocket IoT server');
    
    // 接收
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Server received: ${message}`);
    });

    // 断开连接
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running');