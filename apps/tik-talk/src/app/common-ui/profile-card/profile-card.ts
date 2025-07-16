import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { Profile } from '../../../../../../libs/profile/src';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  standalone: true,
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  @Input() profile!: Profile;
}
