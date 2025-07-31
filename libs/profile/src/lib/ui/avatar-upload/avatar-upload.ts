import { SvgIconComponent } from '@tt/common-ui';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Dnd } from '@tt/common-ui';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  imports: [SvgIconComponent, Dnd, FormsModule],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarUpload {
  preview = signal<string>('/assets/svg/avatar-placeholder.svg');
  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    if (!file || (!file.type.match('image') && !file.type.match('svg'))) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() || '');
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
