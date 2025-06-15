import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

export interface Log {
  usuario: string;
  login: boolean;
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private socket: Socket;

  constructor() {
    // Ajuste a URL para o seu backend websocket
    this.socket = io('http://localhost:3000'); 
  }

  // Observable que emite logs recebidos do backend
  getLogs(): Observable<Log> {
    return new Observable((observer) => {
      this.socket.on('new-log', (log: Log) => {
        observer.next(log);
      });

      // Cleanup ao cancelar a inscrição
      return () => this.socket.off('new-log');
    });
  }
}
