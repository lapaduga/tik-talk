import { AvatarCircleComponent } from '@tt/common-ui';
import { Component, input } from '@angular/core';
import { LastMessageRes } from '../../../data/interfaces/chats.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chats-btn.html',
  styleUrl: './chats-btn.scss',
})
export class ChatsBtn {
  chat = input<LastMessageRes>();
}
