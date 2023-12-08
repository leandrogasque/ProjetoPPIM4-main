// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html'); // Substitua pelo caminho correto para o seu arquivo HTML
// });

// io.on('connection', (socket) => {
//     console.log('Novo usuário conectado');

//     socket.on('message', (data) => {
//         // Reemitir a mensagem para todos os clientes conectados
//         io.emit('message', data);
//     });

//     socket.on('disconnect', () => {
//         console.log('Usuário desconectado');
//     });
// });

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });
