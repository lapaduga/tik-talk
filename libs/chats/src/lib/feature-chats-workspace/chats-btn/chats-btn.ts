import { AvatarCircleComponent } from '@tt/common-ui';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LastMessageRes } from '@tt/data-access';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chats-btn.html',
  styleUrl: './chats-btn.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsBtn {
  chat = input<LastMessageRes>();
}
