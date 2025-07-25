import { map, switchMap } from 'rxjs';
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExperimentService } from '../experiment.service';
import { experimentActions } from './actions';

@Injectable({
	providedIn: 'root'
})
export class ExperimentEffects {
	experimentService = inject(ExperimentService);
	actions$ = inject(Actions);

	subs = createEffect(() => {
		return this.actions$.pipe(
			ofType(experimentActions.fetchSubscriptions),
			switchMap(() => {
				return this.experimentService.getSubscriptions();
			}),
			map(subscriptions => experimentActions.subsLoaded({ subscriptions }))
		);
	});
}