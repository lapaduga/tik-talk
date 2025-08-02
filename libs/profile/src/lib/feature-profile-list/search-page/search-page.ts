import { Component, inject, ChangeDetectionStrategy/* , OnInit */ } from '@angular/core';
import { ProfileCard } from '../../ui/index';
import { ProfileFilters } from '../index';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles, selectProfileFilters } from '../../store';
import { InfiniteScrollTrigger } from '@tt/common-ui';
// import { WaIntersectionObserver, WaIntersectionObservee } from '@ng-web-apis/intersection-observer';
// import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
// import { firstValueFrom, scan, Subject } from 'rxjs';
// import { Profile, ProfileService } from '@tt/data-access';

@Component({
  selector: 'tt-search-page',
  imports: [ProfileCard, ProfileFilters, InfiniteScrollTrigger/* WaIntersectionObserver, WaIntersectionObservee, InfiniteScrollDirective */],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage /* implements OnInit */ {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);
  /*   profileService = inject(ProfileService);
    page = 0;
  
    profilesSubject$ = new Subject<Profile[]>();
  
    infiniteProfiles$ = this.profilesSubject$.pipe(
      scan((acc, curr) => {
        return acc.concat(curr) as Profile[];
      }, [] as Profile[])
    ); */

  constructor() {
    const currentFilters = this.store.selectSignal(selectProfileFilters)();
    this.store.dispatch(profileActions.filterEvents({ filters: currentFilters }));
  }

  /*   ngOnInit() {
      this.getNextPage();
    }
  
    async getNextPage() {
      this.page++;
      const res = await firstValueFrom(this.profileService.filterProfiles({ page: this.page }));
  
      this.profilesSubject$.next(res.items);
    } */

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  /*   onIntersection(entries: IntersectionObserverEntry[]) {
      if (!entries.length) return;
  
      if (entries[0].intersectionRatio > 0) {
        this.timeToFetch();
      }
    } */

  /*   onScroll() {
      // this.timeToFetch();
      this.getNextPage();
    } */
}
