import { createFeature, createReducer, on } from "@ngrx/store";
import { Profile } from "@tt/data-access";
import { experimentActions } from "./actions";

export interface ExperimentState {
	subscriptions: Profile[] | null
}

export const initialState: ExperimentState = {
	subscriptions: null
}

export const experimentFeature = createFeature({
	name: 'experimentFeature',
	reducer: createReducer(
		initialState,
		on(experimentActions.subsLoaded,
			(state, { subscriptions }) => {
				return {
					subscriptions: subscriptions.items
				}
			}
		)
	)
});