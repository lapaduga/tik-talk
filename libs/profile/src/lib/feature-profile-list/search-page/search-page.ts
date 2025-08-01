import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ProfileCard } from '../../ui/index';
import { ProfileFilters } from '../index';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles, selectProfileFilters } from '../../store';
import { InfiniteScrollTrigger } from '@tt/common-ui';

@Component({
  selector: 'tt-search-page',
  imports: [ProfileCard, ProfileFilters, InfiniteScrollTrigger],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {
    const currentFilters = this.store.selectSignal(selectProfileFilters)();
    this.store.dispatch(profileActions.filterEvents({ filters: currentFilters }));
  }

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }
}
