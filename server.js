const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('play', (data) => socket.broadcast.emit('play', data));
    socket.on('pause', (data) => socket.broadcast.emit('pause', data));
    socket.on('seek', (data) => socket.broadcast.emit('seek', data));
    socket.on('mudar video', (url) => socket.broadcast.emit('mudar video', url));
    socket.on('chat message', (msg) => socket.broadcast.emit('chat message', msg));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Llama rodando na porta ${PORT}`));
