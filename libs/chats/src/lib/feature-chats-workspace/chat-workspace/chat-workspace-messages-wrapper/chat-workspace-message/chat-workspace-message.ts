import { AvatarCircleComponent } from '@tt/common-ui';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from '@tt/data-access';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.html',
  styleUrl: './chat-workspace-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessage implements OnChanges {
  message = input.required<Message>();

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }

  ngOnChanges() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.messageContainer) {
      const parent =
        this.messageContainer.nativeElement.closest('.messages-wrapper');

      setTimeout(() => {
        parent.scrollTop = parent.scrollHeight;
      }, 30);
    }
  }
}
