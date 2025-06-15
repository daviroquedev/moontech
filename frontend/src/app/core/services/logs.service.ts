import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/log.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  // Update URL to your backend logs endpoint
  private apiUrl = 'http://localhost:3000/logs'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.apiUrl);
  }
}
