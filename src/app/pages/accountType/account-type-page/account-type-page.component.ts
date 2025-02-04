import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataFirebaseService } from '../../../service/data.firebase.service';

@Component({
  selector: 'app-account-type-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-type-page.component.html',
  styleUrl: './account-type-page.component.css',
})
export class AccountTypePageComponent {
  public form: FormGroup;

  private firebaseService = inject(DataFirebaseService);
  data: any = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ name: [], conta: [], contem: [] });
  }

  ngOnInit() {
    // 🔥 Escuta mudanças em tempo real
    this.firebaseService.listenData('users', (data) => {
      this.data = data;
      console.log('Dados atualizados:', this.data);
    });
  }

  deleteUser() {
    this.firebaseService
      .deleteData('users/user1')
      .then(() => console.log('Usuário removido!'))
      .catch((error) => console.error('Erro ao remover:', error));
  }

  // 🔥 Salvar dados no Firebase
  saveAccount(name: string, conta: string, contem: boolean, usuario: string) {
    this.firebaseService.saveData(`AccountTypes/${usuario}`, {
      name: name,
      conta: conta,
      contem: contem,
      usuario: 'rodrigo',
    });
  }

  // 🔥 Adicionar item a uma lista
  addAccount() {
    this.firebaseService.addToList('users', { name: 'Maria', age: 30 });
  }
}
