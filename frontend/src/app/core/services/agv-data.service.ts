import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AgvState } from '../models/agv.model';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AgvDataService {
  private socket: Socket;

  constructor(private zone: NgZone) {
    // Voltamos a ligar diretamente, pois não temos mais o Nginx a fazer proxy complexo
    this.socket = io('http://localhost:3000', {
      transports: ['websocket']
    });
  }

  // Voltamos a ter um único método para obter os dados de um AGV
  public getAgvUpdates(): Observable<AgvState> {
    return new Observable<AgvState>(observer => {
      this.socket.on('agv-update', (data: AgvState) => {
        this.zone.run(() => {
          observer.next(data);
        });
      });
    });
  }

  // O comando de controlo agora é mais simples
  public sendCommand(action: string, value: any): void {
    this.socket.emit('control-command', { action, value });
  }
}
