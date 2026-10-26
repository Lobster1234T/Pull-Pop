// Socket.io utilities для реал-тайм обновлений
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export interface SocketEvents {
  'order:created': (data: any) => void;
  'order:status': (data: any) => void;
  'payment:completed': (data: any) => void;
  'product:updated': (data: any) => void;
  'review:posted': (data: any) => void;
  'notification:new': (data: any) => void;
  'user:online': (data: any) => void;
}

/**
 * Подключиться к Socket.io серверу
 */
export function connectSocket(): Socket {
  if (socket && socket.connected) {
    return socket;
  }

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('Socket.io подключен');
  });

  socket.on('disconnect', () => {
    console.log('Socket.io отключен');
  });

  socket.on('error', (error) => {
    console.error('Socket.io ошибка:', error);
  });

  return socket;
}

/**
 * Отключиться от Socket.io
 */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/**
 * Получить текущий Socket
 */
export function getSocket(): Socket | null {
  return socket;
}

/**
 * Слушать событие
 */
export function on<E extends keyof SocketEvents>(
  event: E,
  callback: any
): void {
  const s = connectSocket();
  s.on(event, callback);
}

/**
 * Один раз слушать событие
 */
export function once<E extends keyof SocketEvents>(
  event: E,
  callback: any
): void {
  const s = connectSocket();
  s.once(event, callback);
}

/**
 * Отправить событие
 */
export function emit<E extends keyof SocketEvents>(
  event: E,
  data?: any
): void {
  const s = connectSocket();
  s.emit(event, data);
}

/**
 * Остановить слушать событие
 */
export function off<E extends keyof SocketEvents>(event: E): void {
  if (socket) {
    socket.off(event);
  }
}

/**
 * Присоединиться к комнате
 */
export function joinRoom(room: string): void {
  const s = connectSocket();
  s.emit('join', { room });
}

/**
 * Покинуть комнату
 */
export function leaveRoom(room: string): void {
  const s = connectSocket();
  s.emit('leave', { room });
}

/**
 * Отправить приватное сообщение
 */
export function sendPrivateMessage(userId: string, message: any): void {
  const s = connectSocket();
  s.emit('private-message', { to: userId, message });
}
