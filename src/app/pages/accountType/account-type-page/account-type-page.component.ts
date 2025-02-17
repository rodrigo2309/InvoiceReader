import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataService } from '../../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AccountType } from '../../../models/accountType.model';

@Component({
  selector: 'app-account-type-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './account-type-page.component.html',
  styleUrl: './account-type-page.component.css',
})
export class AccountTypePageComponent {
  public form: FormGroup;
  public busy = false;
  public accountTypes$!: Observable<AccountType[]>;

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [],
      nome: [],
      conta: [],
      contem: [true],
      usuario: [],
    });
  }

  ngOnInit() {
    this.form.get('usuario')?.setValue('rodrigo');
    this.getAll();
  }

  getAll() {
    this.accountTypes$ = this.service.getByUserAccountType(
      this.form.get('usuario')?.value
    );
  }

  create() {
    let create = {
      nome: this.form.get('nome')?.value,
      conta: this.form.get('conta')?.value,
      contem: this.form.get('contem')?.value,
      usuario: this.form.get('usuario')?.value,
    };

    this.busy = true;
    this.service.createAccountType(create).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Cadastrado com Sucesso!');
        this.clean();
        this.getAll();
      },
      (err) => {
        this.toastr.error(err.message, 'Cadastro inválido');
        this.busy = false;
      }
    );
  }

  clean() {
    this.form.patchValue({
      id: '',
      nome: '',
      conta: '',
      contem: true,
      usuario: 'rodrigo',
    });
  }

  delete() {
    this.busy = true;

    let deletar = {
      id: this.form.get('id')?.value.trim(),
    };

    this.service.deleteAccountType(deletar).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Deletado!!');
        this.clean();
        this.getAll();
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.message, 'Erro ao deletar!!');
        this.busy = false;
      }
    );
  }
}
