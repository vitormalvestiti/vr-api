import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*', methods: ['GET', 'POST'] }, 
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;


  emitStatusUpdate(mensagemId: string, status: string) {
    this.server.emit('statusUpdate', { mensagemId, status });
  }
}