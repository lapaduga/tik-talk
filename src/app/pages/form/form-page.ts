import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MockService } from './mock-service/mock.service';
import { Address, Feature } from './interfaces/interfaces';

enum ReceiverType {
  INDIVIDUAL = 'INDIVIDUAL',
  LEGAL = 'LEGAL',
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
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
  mockService = inject(MockService);
  features: Feature[] = [];

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.INDIVIDUAL),
    name: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>(''),
    inn: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({}),
  });

  constructor() {
    this.mockService.getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe(addresses => {
        this.form.controls.addresses.clear();

        addresses.forEach(address => {
          this.form.controls.addresses.push(getAddressForm(address));
        });

        // this.form.controls.addresses.setControl(1, getAddressForm(addresses[0]))
      });

    this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe(features => {
        this.features = features;

        this.features.forEach(feat => {
          this.form.controls.feature.addControl(
            feat.code,
            new FormControl(feat.value)
          );
        });
      });

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
    console.log(this.form.valid);

    if (this.form.invalid) return;

    console.log(this.form.value);
  }

  addAddress() {
    this.form.controls.addresses.insert(0, getAddressForm())
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;
}
