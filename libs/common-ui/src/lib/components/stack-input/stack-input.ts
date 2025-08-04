import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIcon } from '../svg-icon/svg-icon';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tt-stack-input',
  imports: [CommonModule, SvgIcon, FormsModule],
  templateUrl: './stack-input.html',
  styleUrl: './stack-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInput)
    }
  ]
})
export class StackInput implements ControlValueAccessor {
  value$ = new BehaviorSubject<string[]>([]);
  #disabled = false;
  innerInput = '';

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.#disabled;
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.stopPropagation();
    keyboardEvent.preventDefault();

    if (!this.innerInput) return;

    this.value$.next([...this.value$.value, this.innerInput]);
    this.innerInput = '';
    this.onChange(this.value$.value);
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value$.next([]);
      return;
    }

    this.value$.next(stack);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.#disabled = isDisabled;
  }

  onChange(value: string[] | null) {

  }

  onTouched() {

  }

  onTagDelete(index: number) {
    const tags = this.value$.value;
    tags.splice(index, 1);
    this.value$.next(tags);
    this.onChange(this.value$.value);
  }
}
