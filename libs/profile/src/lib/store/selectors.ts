import { profileFeature } from './reducer';
import { createSelector } from "@ngrx/store";

export const selectFilteredProfiles = createSelector(
	profileFeature.selectProfiles,
	profiles => profiles
);