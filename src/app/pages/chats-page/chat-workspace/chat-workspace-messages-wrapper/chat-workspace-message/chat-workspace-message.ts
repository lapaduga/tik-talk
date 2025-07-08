import { Message } from './../../../../../data/interfaces/chats.interface';
import { Component, HostBinding, input } from '@angular/core';
import { AvatarCircle } from "../../../../../common-ui/avatar-circle/avatar-circle";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircle, DatePipe],
  templateUrl: './chat-workspace-message.html',
  styleUrl: './chat-workspace-message.scss'
})
export class ChatWorkspaceMessage {
  message = input.required<Message>();

  @HostBinding ('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
