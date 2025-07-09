import { Message } from './../../../../../data/interfaces/chats.interface';
import { Component, ElementRef, HostBinding, input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AvatarCircle } from "../../../../../common-ui/avatar-circle/avatar-circle";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircle, DatePipe],
  templateUrl: './chat-workspace-message.html',
  styleUrl: './chat-workspace-message.scss'
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
      const parent = this.messageContainer.nativeElement.closest('.messages-wrapper');

      setTimeout(() => {
        parent.scrollTop = parent.scrollHeight;
      }, 30);
    }
  }
}
