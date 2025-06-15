import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class LogsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('✅ Servidor WebSocket de Logs inicializado.');
  }

  handleConnection(client: Socket) {
    console.log(`Cliente conectado ao logs: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado do logs: ${client.id}`);
  }

  // Método para emitir novos logs
  emitLog(log: any) {
    this.server.emit('new-log', log);
  }
}
