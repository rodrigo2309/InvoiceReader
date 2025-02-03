import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public url = 'http://localhost:5242';

  constructor(private http: HttpClient) {}

  getAccountsByBase64(base64: string): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(`${this.url}/v1/Read`, {
      file64: base64,
    });
  }
}
