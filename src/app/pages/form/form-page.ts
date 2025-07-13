import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

enum ReceiverType {
  INDIVIDUAL = 'INDIVIDUAL',
  LEGAL = 'LEGAL',
}

function getAddressForm() {
  return new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    building: new FormControl<number | null>(null),
    apartment: new FormControl<number | null>(null),
  })
}

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-page.html',
  styleUrl: './form-page.scss'
})
export class FormPage {
  ReceiverType = ReceiverType;

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.INDIVIDUAL),
    name: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>(''),
    inn: new FormControl<string>(''),
    address: getAddressForm()
  });

  constructor() {
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(val => {
        this.form.controls.inn.clearValidators();

        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ])
        }
      });
  }

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    console.log(this.form.value);
  }
}
