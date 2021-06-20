import { AbstractControl, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let sum;
    let rest;
    sum = 0;
    if (control.value === '00000000000') return { cpf: true };

    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(control.value.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(control.value.substring(9, 10))) return { cpf: true };

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(control.value.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(control.value.substring(10, 11))) return { cpf: true };

    return null;
  };
}
