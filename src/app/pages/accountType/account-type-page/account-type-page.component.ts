import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-type-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './account-type-page.component.html',
  styleUrl: './account-type-page.component.css',
})
export class AccountTypePageComponent {
  public form: FormGroup;
  public busy = false;

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: [],
      conta: [],
      contem: [],
      usuario: [],
    });
  }

  ngOnInit() {}

  create() {
    this.busy = true;
    this.form.get('usuario')?.setValue('rodrigo');
    this.service.createAccountType(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Cadastrado com Sucesso!');
        this.form.reset();
      },
      (err) => {
        this.toastr.error(err.message, 'Cadastro inválido');
        this.busy = false;
      }
    );
  }

  delete() {
    this.busy = true;

    let deletar = {
      nome: this.form.get('nome')?.value,
    };

    this.service.deleteAccountType(deletar).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Deletado!!');
        this.form.reset();
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.message, 'Erro ao deletar!!');
        this.busy = false;
      }
    );
  }
}
