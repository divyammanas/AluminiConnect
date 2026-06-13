import { Server } from 'socket.io';
import { env } from '../config/env.js';

export function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      credentials: true,
      origin: env.clientUrls
    }
  });

  io.on('connection', (socket) => {
    socket.emit('system:ready', { connected: true });
  });

  return io;
}

