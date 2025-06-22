import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';
import { ProfileService } from '../../data/services/profile.service';
import { ProfileFilters } from "./profile-filters/profile-filters";

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  profileService = inject(ProfileService);
  cdr: any = inject(ChangeDetectorRef)
  profiles = this.profileService.filteredProfiles;
}
