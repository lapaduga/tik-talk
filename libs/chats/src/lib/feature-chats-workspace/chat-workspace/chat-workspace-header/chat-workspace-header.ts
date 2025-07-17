import { AvatarCircleComponent } from '@tt/common-ui';
import { Component, input } from '@angular/core';
import { Profile } from '@tt/data-access';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.html',
  styleUrl: './chat-workspace-header.scss',
})
export class ChatWorkspaceHeader {
  profile = input.required<Profile>();
}
