import { Injectable, inject } from '@angular/core';
import {
  Database,
  ref,
  set,
  get,
  onValue,
  push,
  remove,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class DataFirebaseService {
  private db = inject(Database); // Injeta o banco de dados

  // 🔥 Salvar dados (criação/atualização)
  saveData(path: string, data: any) {
    return set(ref(this.db, path), data);
  }

  // Função para remover um dado específico
  deleteData(path: string) {
    return remove(ref(this.db, path));
  }

  // 🔥 Ler dados uma única vez
  async getData(path: string) {
    const snapshot = await get(ref(this.db, path));
    return snapshot.exists() ? snapshot.val() : null;
  }

  // 🔥 Escutar mudanças em tempo real
  listenData(path: string, callback: (data: any) => void) {
    const dbRef = ref(this.db, path);
    onValue(dbRef, (snapshot) => {
      callback(snapshot.val());
    });
  }

  // 🔥 Adicionar item a uma lista (gera um ID único)
  addToList(path: string, data: any) {
    return push(ref(this.db, path), data);
  }
}
