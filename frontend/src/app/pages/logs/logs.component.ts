import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Log } from '../../core/models/log.model'; // Assuming you have a log model
import { LogsService } from '../../core/services/logs.service'; // Assuming you have a logs service

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnDestroy {
  logs: Log[] = [];
  private socket: Socket;

  constructor(private logsService: LogsService) {
    // Initialize socket connection - update URL to your backend
    this.socket = io('http://localhost:3000'); // Replace with your backend URL
  }

  ngOnInit(): void {
    // Fetch initial logs
    this.logsService.getLogs().subscribe(
      (initialLogs) => {
        this.logs = initialLogs;
      },
      (error) => {
        console.error('Error fetching initial logs:', error);
      }
    );

    // Listen for new logs from WebSocket
    this.socket.on('newLog', (log: Log) => {
      this.logs.push(log);
      // Optional: Implement logic to keep the list from growing indefinitely
      // e.g., this.logs = this.logs.slice(-100); // Keep last 100 logs
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server for logs');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server for logs');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
