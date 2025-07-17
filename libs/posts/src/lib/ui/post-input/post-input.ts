import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { GlobalStoreService } from '@tt/data-access';

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, NgIf, SvgIconComponent, FormsModule],
  templateUrl: './post-input.html',
  styleUrl: './post-input.scss',
})
export class PostInput {
  r2 = inject(Renderer2);
  profile = inject(GlobalStoreService).me;
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
