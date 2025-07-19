import { map, switchMap } from 'rxjs';
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProfileService } from "@tt/data-access";
import { profileActions } from './actions';

@Injectable({
	providedIn: 'root'
})
export class ProfileEffects {
	profileService = inject(ProfileService);
	actions$ = inject(Actions);

	filterProfiles = createEffect(() => {
		return this.actions$.pipe(
			ofType(profileActions.filterEvents),
			switchMap(({ filters }) => {
				return this.profileService.filterProfiles(filters);
			}),
			map(res => profileActions.profilesLoaded({ profiles: res.items }))
		);
	});
}