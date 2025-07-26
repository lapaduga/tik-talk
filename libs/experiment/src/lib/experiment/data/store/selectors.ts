import { experimentFeature, totalSubsFeature } from './reducer';
import { createSelector } from "@ngrx/store";

export const selectSubs = createSelector(
	experimentFeature.selectSubscriptions,
	subs => subs
);

export const selectTotalSubs = createSelector(
	totalSubsFeature.selectTotal,
	total => total
);