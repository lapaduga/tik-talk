import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ProfileCard } from '../../ui/index';
import { ProfileFilters } from '../index';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles, selectProfileFilters } from '../../store';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  store = inject(Store);
  cdr: any = inject(ChangeDetectorRef);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {
    const currentFilters = this.store.selectSignal(selectProfileFilters)();
    this.store.dispatch(profileActions.filterEvents({ filters: currentFilters }));
  }
}
