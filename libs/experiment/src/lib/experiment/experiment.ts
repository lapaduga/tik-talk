import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentService } from './data/experiment.service';
import { map, Observable } from 'rxjs';
import { Profile } from '@tt/data-access';
import { Store } from '@ngrx/store';
import { experimentActions, selectSubs, selectTotalSubs } from './data/store';

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

  constructor() {
    /*     this.subscriptions$ = this.experimentService.getSubscriptions()
          .pipe(
            map(val => val.items),
            takeUntilDestroyed()
          ); */
    this.store.dispatch(experimentActions.fetchSubscriptions());
    this.subscriptions$ = this.store.select(selectSubs) as Observable<Profile[]>;
    this.subscriptions$.subscribe(v => {
      console.log('constructor', v);
    });

    this.store.select(selectTotalSubs)
      .subscribe(val => {
        this.totalSubs = val;
      });
  }

  subscribeUser() {

  }

  unsubscribeUser(id: number) {
    this.store.dispatch(experimentActions.unsubDispatched({ id: id }))
  }
}
