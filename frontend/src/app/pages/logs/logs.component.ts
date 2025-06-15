import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Log, LogsService } from '../../core/services/logs.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LogsComponent implements OnInit, OnDestroy {
  logs: Log[] = [];
  private logSub?: Subscription;

  constructor(private logsService: LogsService) {}

  ngOnInit() {
    this.logsService.fetchLogs().subscribe((logs) => {
      console.log('Logs fetched from server:', logs);
      this.logs = logs;
    });
  
    this.logSub = this.logsService.getLogs().subscribe((log) => {
      this.logs.unshift(log);
    });
  }


  


  ngOnDestroy() {
    this.logSub?.unsubscribe();
  }
}
