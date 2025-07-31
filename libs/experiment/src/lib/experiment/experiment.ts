import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentService } from './data/experiment.service';
import { map, Observable } from 'rxjs';
import { Profile } from '@tt/data-access';
import { Store } from '@ngrx/store';
import { experimentActions, selectSubs, selectTotalSubs } from './data/store';
import { profileActions, selectFilteredProfiles } from '@tt/profile';

@Component({
  selector: 'lib-experiment',
  imports: [CommonModule],
  templateUrl: './experiment.html',
  styleUrl: './experiment.scss',
})
export class ExperimentPage {
  experimentService = inject(ExperimentService);
  subscriptions$!: Observable<Profile[]>;
  store = inject(Store);
  totalSubs = 0;
  profiles: Observable<Profile[]> | null = null;

  constructor() {
/*     this.profiles = this.experimentService.filterProfiles({})
      .pipe(
        map(item => item.items)
      ); */
    /*     this.subscriptions$ = this.experimentService.getSubscriptions()
          .pipe(
            map(val => val.items),
            takeUntilDestroyed()
          ); */
    this.profiles = this.store.select(selectFilteredProfiles);
    this.store.dispatch(experimentActions.fetchSubscriptions());
    this.subscriptions$ = this.store.select(selectSubs) as Observable<Profile[]>;
    this.subscriptions$.subscribe();

    this.store.select(selectTotalSubs)
      .subscribe(val => {
        this.totalSubs = val;
      });

    this.store.dispatch(profileActions.filterEvents({ filters: {} }));
  }

  subscribeUser(profile: Profile) {
    this.store.dispatch(experimentActions.subAdded({ profile: profile }));
    this.store.dispatch(profileActions.profileChangedAfterSubscription({ profile }));
  }

  unsubscribeUser(id: number, profile: Profile) {
    this.store.dispatch(experimentActions.unsubDispatched({ id: id }));
    this.store.dispatch(profileActions.profileChangedAfterSubscriptionCancelled({ profile }));
  }
}
