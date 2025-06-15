import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
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

  constructor(private zone: NgZone, private http: HttpClient) {
    this.socket = io('http://localhost:3000/', { transports: ['websocket'] });
  }

  // 1. Requisição HTTP para buscar logs do banco
  fetchLogs(): Observable<Log[]> {
    return this.http.get<Log[]>('http://localhost:4200/api/logs');
  }

  // 2. WebSocket para receber logs em tempo real
  getLogs(): Observable<Log> {
    return new Observable((observer) => {
      this.socket.on('new-log', (log: Log) => {
        this.zone.run(() => observer.next(log));
      });
      return () => this.socket.off('new-log');
    });
  }
}
