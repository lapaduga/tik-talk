import { DadataService, DadataSuggestion } from '@tt/data-access';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TtInput } from "../tt-input/tt-input";
import { debounceTime, switchMap, tap } from 'rxjs';

@Component({
  selector: 'tt-address-input',
  imports: [CommonModule, TtInput, ReactiveFormsModule],
  templateUrl: './address-input.html',
  styleUrl: './address-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInput)
    }
  ]
})
export class AddressInput implements ControlValueAccessor {
  cdr = inject(ChangeDetectorRef);
  #dadataService = inject(DadataService);
  
  isDropdownOpened = signal<boolean>(false);
  
  innerSearchControl = new FormControl();
  addressForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    building: new FormControl(''),
  });

  suggestions$ = this.innerSearchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap(val => {
      return this.#dadataService.getSuggestion(val)
        .pipe(
          tap(res => {
            this.isDropdownOpened.set(!!res.length)
          })
        );
    })
  );

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    });

    const address = city?.split(' ');
    this.addressForm.patchValue({
      city: address ? address[0] : '',
      street: address ? address[1] : '',
      building: address ? address[2] : '',
    });

    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  onChange(value: any): void {

  }

  onTouched() {

  }

  onSuggestionPick(suggest: DadataSuggestion) {
    this.isDropdownOpened.set(false);
    // this.innerSearchControl.patchValue(city, {
    //   emitEvent: false
    // });
    // this.onChange(city);
    this.addressForm.patchValue({
      city: suggest.data.city,
      street: suggest.data.street,
      building: suggest.data.house,
    });

    this.onChange(this.innerSearchControl.value);
    this.cdr.markForCheck();
  }
}
