import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../../models/transaction.model';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-importacao-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './importacao-page.component.html',
  styleUrl: './importacao-page.component.css',
})
export class ImportacaoPageComponent {
  public nome: any;
  url = 'http://localhost:5242';
  public transacoes$!: Observable<Transaction[]>;
  base64: string | null = null;

  constructor(private data: DataService) {}

  read() {
    this.transacoes$ = this.data.getAccountsByBase64(this.base64!);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64 = e.target.result.split(',')[1]; // Pega apenas a parte Base64
      };
      reader.readAsDataURL(file);
    }
  }

  retornaLista() {
    var lista: Transaction[] = [
      { data: '01/01/2025', title: 'mundial', valor: '10.00' },
      { data: '20/01/2025', title: 'farmacia', valor: '50.00' },
      { data: '30/01/2025', title: 'guanabara', valor: '100.00' },
      { data: '30/01/2025', title: 'casaDocaraio', valor: '58.00' },
      { data: '30/01/2025', title: 'chamabari', valor: '5646.00' },
      { data: '30/01/2025', title: 'shopping', valor: '45.00' },
      { data: '30/01/2025', title: 'salao', valor: '483.00' },
      { data: '30/01/2025', title: 'joguinho', valor: '566.00' },
      { data: '30/01/2025', title: 'computador', valor: '5400.00' },
      { data: '30/01/2025', title: 'rtx', valor: '1000.00' },
    ];

    return lista;
  }
}
