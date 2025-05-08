import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; // Adjust the import path based on your library
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class LoginDialogComponent {
  @Output() login = new EventEmitter<{
    email: string;
    password: string;
  }>();
  @Output() dialogClose = new EventEmitter<void>();
  @Input() isDialogVisible = false;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // console.log('Login form submitted:', this.loginForm.value);
      this.login.emit({ email, password });
      this.loginForm.reset(); // Reset the form after submission
    }
  }

  onClose() {
    this.loginForm.reset(); // Reset the form when closing the dialog
    this.dialogClose.emit();
  }
}
