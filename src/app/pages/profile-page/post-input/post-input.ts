import { Component, EventEmitter, inject, Output, Renderer2 } from '@angular/core';
import { AvatarCircle } from "../../../common-ui/avatar-circle/avatar-circle";
import { ProfileService } from '../../../data/services/profile.service';
import { NgIf } from '@angular/common';
import { SvgIcon } from '../../../common-ui/svg-icon/svg-icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircle, NgIf, SvgIcon, FormsModule],
  templateUrl: './post-input.html',
  styleUrl: './post-input.scss'
})
export class PostInput {
  r2 = inject(Renderer2);
  profile = inject(ProfileService).me;
  postText = '';

  @Output() created = new EventEmitter();

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', `${textarea.scrollHeight}px`);
  }

  onSend() {
    if (this.postText.trim()) {
      this.created.emit(this.postText);
      this.postText = '';
    }
  }
}
