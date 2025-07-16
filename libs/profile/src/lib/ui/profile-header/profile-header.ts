import { AvatarCircleComponent } from '@tt/common-ui';
import { Component, input } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader {
  profile = input<Profile>();
}
