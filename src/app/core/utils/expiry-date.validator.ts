import { AbstractControl, ValidationErrors } from '@angular/forms';

export function expiryDateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (!/^\d{2}\/\d{2}$/.test(value)) return { invalidFormat: true };

  const [mmStr, yyStr] = value.split('/');
  const month = parseInt(mmStr, 10);
  const year = parseInt(yyStr, 10) + 2000;

  if (month < 1 || month > 12) return { invalidMonth: true };

  const now = new Date();
  const expiry = new Date(year, month - 1, 1);
  const current = new Date(now.getFullYear(), now.getMonth(), 1);

  return expiry >= current ? null : { expired: true }; // Validna kartica
}
