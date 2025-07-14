import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { SvgIcon } from '../svg-icon/svg-icon';
import { AvatarCircle } from '../avatar-circle/avatar-circle';

@Component({
  selector: 'app-message-input',
  imports: [AvatarCircle, SvgIcon, FormsModule, NgIf],
  templateUrl: './message-input.html',
  styleUrl: './message-input.scss',
})
export class MessageInput {
  r2 = inject(Renderer2);
  me = inject(ProfileService).me;
  postText = '';

  @Output() created = new EventEmitter<string>();

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', `${textarea.scrollHeight}px`);
  }

  onCreatePost() {
    if (!this.postText) return;

    this.created.emit(this.postText);
    this.postText = '';
  }
}
