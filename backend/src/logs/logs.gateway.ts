import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class LogsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('✅ WebSocket Gateway Logs inicializado con éxito!');
  }

  handleConnection(client: Socket) {
    console.log(`Cliente conectado a logs: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado de logs: ${client.id}`);
  }

  emitLog(log: any) {
    console.log('Emitiendo log vía websocket:', log);

    this.server.emit('new-log', log);
  }
}
