import { AvatarCircleComponent } from '@tt/common-ui';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '@tt/data-access';

@Component({
  selector: 'tt-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeader {
  profile = input<Profile>();
}
