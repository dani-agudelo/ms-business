import Ws from 'app/services/Ws'
Ws.boot()

Ws.io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    // Maneja mensajes del chat
    socket.on('message', (message) => {
        console.log('Mensaje recibido:', message);
        // Emitir el mensaje a todos los clientes conectados
        Ws.io.emit('message', message);
    });

    // Maneja desconexiones
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});
