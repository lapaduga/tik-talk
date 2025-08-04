import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tt-input.html',
  styleUrl: './tt-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInput)
    }
  ]
})
export class TtInput implements ControlValueAccessor {
  type = input<'text' | 'password'>('text');
  placeholder = input<string>();
  disabled = signal<boolean>(false);
  
  value: string | null = null;

  onChange: any;
  onTouched: any;

  writeValue(val: string | null): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onModelChange(value: string | null): void {
    this.onChange(value);
  }
}
