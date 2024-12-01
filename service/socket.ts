import SocketIOClient, { Socket } from 'socket.io-client';

class SocketService {
  io!: Socket;
  connected?: boolean = false;

  connect(token: string) {
    this.io = SocketIOClient(process.env.NEXT_PUBLIC_API_URL, {
      autoConnect: true,
      extraHeaders: {
        Authorization: token
      }
    });
    this.io.on('connect', () => {
      this.connected = true;
    });
  }

  getIo() {
    return this.io;
  }

  on(event: string, callback: (data: any) => void) {
    this.io?.on(event, callback);
    return () => this.io?.off(event, callback);
  }
}

export const socketService = new SocketService();
