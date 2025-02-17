import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { AccountType } from '../models/accountType.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public url = 'http://localhost:5242';

  public composeParams() {
    const params = new HttpParams().set('nome', 'teste');
    return params;
  }

  constructor(private http: HttpClient) {}

  getAccountsByBase64(base64: string): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(`${this.url}/v1/Read`, {
      file64: base64,
    });
  }

  getByUserAccountType(usuario: string): Observable<AccountType[]> {
    return this.http.post<AccountType[]>(
      `${this.url}/api/TipoContas/GetByUser`,
      { usuario: usuario }
    );
  }

  createAccountType(data: any) {
    return this.http.post(`${this.url}/api/TipoContas/Create`, data);
  }

  deleteAccountType(data: any) {
    return this.http.post(`${this.url}/api/TipoContas/Delete`, data);
  }
}
