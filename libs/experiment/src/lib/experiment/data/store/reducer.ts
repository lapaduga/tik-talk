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
		),
		on(experimentActions.unsubDispatchedResponse,
			(state, payload) => {
				const newSubs = [...state.subscriptions as Profile[]].filter(item => item.id !== payload.id);

				return {
					subscriptions: newSubs
				}
			}
		),
		on(experimentActions.subAddedResponse,
			(state, { profile }) => {
				return {
					subscriptions: [...(state.subscriptions as Profile[]), profile]
				}
			}
		)
	)
});

export interface TotalSubs {
	total: number
}

export const initialTotal: TotalSubs = {
	total: 0
}

export const totalSubsFeature = createFeature({
	name: 'totalSubsFeature',
	reducer: createReducer(
		initialTotal,
		on(experimentActions.totalSubsLoaded,
			(state, { total }) => {
				return {
					total
				}
			}
		)
	)
});