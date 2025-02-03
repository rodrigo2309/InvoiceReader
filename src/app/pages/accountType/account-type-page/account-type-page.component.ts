import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-type-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-type-page.component.html',
  styleUrl: './account-type-page.component.css',
})
export class AccountTypePageComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ name: '', conta: '', contem: '' });
  }

  teste() {
    console.log(this.form);
  }
}
