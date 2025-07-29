import { map, switchMap } from 'rxjs';
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExperimentService } from '../experiment.service';
import { experimentActions } from './actions';
import { Profile } from '@tt/data-access';

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

	total = createEffect(() => {
		return this.actions$.pipe(
			ofType(experimentActions.subsLoaded),
			map(({ subscriptions }) => experimentActions.totalSubsLoaded({ total: subscriptions.total })),
		);
	});

	tmpProfile!: Profile;

	subAdded = createEffect(() => {
		return this.actions$.pipe(
			ofType(experimentActions.subAdded),
			switchMap(({ profile }) => {
				this.tmpProfile = profile;
				return this.experimentService.subscribeUser(profile.id);
			}),
			map(() => experimentActions.subAddedResponse({ profile: this.tmpProfile }))
		);
	});

	userId = 0;

	unsub = createEffect(() => {
		return this.actions$.pipe(
			ofType(experimentActions.unsubDispatched),
			switchMap(({ id }) => {
				this.userId = id;
				return this.experimentService.unsubscribeUser(id);
			}),
			map(() => experimentActions.unsubDispatchedResponse({ id: this.userId }))
		);
	});
}