import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ProfileCard } from '../../ui/index';
import { ProfileFilters } from '../index';
import { ProfileService } from '@tt/shared';

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
