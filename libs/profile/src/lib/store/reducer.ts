import { createFeature, createReducer, on } from "@ngrx/store";
import { Profile } from "@tt/data-access";
import { profileActions } from "./actions";

export interface ProfileState {
	profiles: Profile[],
	profileFilters: Record<string, any>
}

export const initialState: ProfileState = {
	profiles: [],
	profileFilters: {}
}

export const profileFeature = createFeature({
	name: 'profileFeature',
	reducer: createReducer(
		initialState,
		on(profileActions.profilesLoaded,
			(state, payload) => {
				return {
					...state,
					profiles: payload.profiles
				}
			}
		),
		on(profileActions.filterEvents,
			(state, { filters }) => {
				return {
					...state,
					profileFilters: filters
				};
			}
		),
		on(
			profileActions.profileChangedAfterSubscription,
			(state, { profile }) => {
				const profiles = [...state.profiles];
				const index = profiles.findIndex(item => item.id === profile.id);
				const actualProfile = { ...profiles[index], isSubscribed: true };
				profiles[index] = actualProfile;
				console.log(profiles);
				return {
					...state,
					profiles: profiles
				}
			}
		),
		on(
			profileActions.profileChangedAfterSubscriptionCancelled,
			(state, { profile }) => {
				const profiles = [...state.profiles];
				const index = profiles.findIndex(item => item.id === profile.id);
				const actualProfile = { ...profiles[index], isSubscribed: false };
				profiles[index] = actualProfile;
				console.log(profiles);
				return {
					...state,
					profiles: profiles
				}
			}
		)
	)
});