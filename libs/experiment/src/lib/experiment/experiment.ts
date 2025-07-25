import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentService } from './data/experiment.service';
import { map, Observable } from 'rxjs';
import { Profile } from '@tt/data-access';
import { Store } from '@ngrx/store';
import { experimentActions, selectSubs } from './data/store';

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

  constructor() {
/*     this.subscriptions$ = this.experimentService.getSubscriptions()
      .pipe(
        map(val => val.items),
        takeUntilDestroyed()
      ); */
      this.store.dispatch(experimentActions.fetchSubscriptions());
      this.subscriptions$ = this.store.select(selectSubs) as Observable<Profile[]>;
  }

  subscribeUser() {
    
  }

  unsubscribeUser() {

  }
}
