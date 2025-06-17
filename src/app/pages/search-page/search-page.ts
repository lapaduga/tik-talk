import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  profileService = inject(ProfileService);
  cdr: any = inject(ChangeDetectorRef)
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(val => {
        this.profiles = val;
        this.cdr.detectChanges()
      });
  }
}
