import { AvatarCircleComponent } from '@tt/common-ui';
import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LastMessageRes } from '../../data';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chats-btn.html',
  styleUrl: './chats-btn.scss',
})
export class ChatsBtn {
  chat = input<LastMessageRes>();
}
