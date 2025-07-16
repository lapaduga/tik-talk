import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';
import { ProfileFilters } from './profile-filters/profile-filters';
import { ProfileService } from '@tt/profile';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  profileService = inject(ProfileService);
  cdr: any = inject(ChangeDetectorRef);
  profiles = this.profileService.filteredProfiles;
}
