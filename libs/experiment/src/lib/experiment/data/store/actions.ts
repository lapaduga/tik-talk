import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Pageable, Profile } from "@tt/data-access";

export const experimentActions = createActionGroup({
	source: 'experiment',
	events: {
		'fetch subscriptions': emptyProps(),
		'subs loaded': props<{ subscriptions: Pageable<Profile> }>(),
		'sub added': props<{ id: number }>(),
		'sub added response': emptyProps(),
		'unsub dispatched': props<{ id: number }>(),
		'unsub dispatched response': emptyProps(),
	}
});