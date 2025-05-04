import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext'; // Add this import if InputTextModule is from PrimeNG
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { expiryDateValidator } from '../../../../core/utils/expiry-date.validator';
import { set } from 'date-fns';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Add this import if ProgressSpinnerModule is from PrimeNG

@Component({
  selector: 'app-pay-reservation',
  templateUrl: './pay-reservation.component.html',
  styleUrls: ['./pay-reservation.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
  ], // Ensure InputTextModule is correctly imported
  standalone: true,
})
export class PayReservationComponent {
  isSubmitting = false;
  formattedCardNumber = '';

  @ViewChild('cardInput', { static: true })
  cardInput!: ElementRef<HTMLInputElement>;

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      fullName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, expiryDateValidator]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Podaci za plaćanje:', this.paymentForm.value);
      this.isSubmitting = true;
      setTimeout(() => {
        this.isSubmitting = false;
        console.log('Plaćanje uspješno obrađeno!');
      }, 5000); // Simulacija kašnjenja od 5 sekundi
    } else {
      console.log('Forma nije validna');
    }
  }

  formatCardNumber(): void {
    let input = this.paymentForm.get('cardNumber')?.value || '';
    input = input.replace(/\D/g, ''); // ukloni sve što nije broj
    const groups = input.match(/.{1,4}/g); // podijeli u grupe po 4
    const formatted = groups ? groups.join(' ') : '';
    this.paymentForm
      .get('cardNumber')
      ?.setValue(formatted, { emitEvent: false });
  }

  formatExpiryDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // ukloni sve što nije broj
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4); // dodaj '/' nakon prvih 2 broja
    }
    this.paymentForm.get('expiryDate')?.setValue(value, { emitEvent: false });
  }
  onCardNumberInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;

    // 1. Ukloni sve što nije broj
    const raw = input.replace(/\D/g, '').slice(0, 16);

    // 2. Formatiraj u xxxx xxxx xxxx xxxx
    const formatted = raw.match(/.{1,4}/g)?.join(' ') ?? '';

    // 3. Ručno postavi prikaz (zaobilazi Angular binding)
    this.cardInput.nativeElement.value = formatted;

    // 4. Sačuvaj samo čisti broj u FormControl
    this.paymentForm.get('cardNumber')?.setValue(raw, { emitEvent: false });
  }

  allowOnlyDigits(event: KeyboardEvent): void {
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode)) {
      event.preventDefault(); // Spriječi unos ako nije broj
    }
  }
}
