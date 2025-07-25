import { experimentFeature } from './reducer';
import { createSelector } from "@ngrx/store";

export const selectSubs = createSelector(
	experimentFeature.selectSubscriptions,
	subs => subs
);
