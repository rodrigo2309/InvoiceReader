import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../../../models/transaction.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-importacao-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './importacao-page.component.html',
  styleUrl: './importacao-page.component.css',
})
export class ImportacaoPageComponent {
  public nome: any;
  public casa: string = 'spider';
  url = 'http://localhost:5242';
  public teste = {
    file64: 'teste',
  };
  public transacoes!: Transaction[];

  constructor(private http: HttpClient) {}

  enviaFaturaBase64(): Observable<Transaction[]> {
    let a = this.http.post<Transaction[]>(`${this.url}/v1/Read`, this.teste);
    console.log(a);
    return a;
  }

  read() {
    this.enviaFaturaBase64().subscribe({
      next: (data) => (
        (this.transacoes = data),
        console.log(this.transacoes),
        console.log(data)
      ),
      error: (err) => console.error('Erro ao buscar usuário', err),
      complete: () => console.log('Requsicao Finalizada'),
    });
  }
}
