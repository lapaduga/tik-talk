import { Component, effect, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '@tt/data-access';
import { AvatarUpload } from '../../ui/avatar-upload/avatar-upload';
import { ProfileHeader } from '../../ui/profile-header/profile-header';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeader, ReactiveFormsModule, AvatarUpload],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUpload) avatarUploader!: AvatarUpload;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    //@ts-ignore
    firstValueFrom(
      // @ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      })
    );
  }

  splitStack(stack: string | null | string[] | undefined) {
    if (!stack) return [];

    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | [] | undefined) {
    if (!stack) return '';

    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
