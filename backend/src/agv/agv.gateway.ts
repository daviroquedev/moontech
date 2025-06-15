import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AgvService } from './agv.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class AgvGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly agvService: AgvService) {}

  afterInit() {
    console.log('✅ Servidor WebSocket inicializado. Iniciando simulación del AGV...');
    setInterval(() => {
      const agv = this.agvService.update();
      this.server.emit('agv-update', agv);
    }, 1000 / 30);
  }

  handleConnection(client: Socket) {
    console.log(`🔌Estación de control conectada: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔌Estación de control desconectada: ${client.id}`);
  }

  @SubscribeMessage('control-command')
  handleControlCommand(client: Socket, command: { action: string; value: number }): void {
    this.agvService.setCommand(command.action, command.value);
  }
}