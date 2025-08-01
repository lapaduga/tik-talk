import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { Profile } from '@tt/data-access';

@Component({
  selector: 'tt-profile-card',
  imports: [ImgUrlPipe],
  standalone: true,
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCard {
  @Input() profile!: Profile;
}
