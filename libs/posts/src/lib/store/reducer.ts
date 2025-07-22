import { createFeature, createReducer, on } from "@ngrx/store";
import { Post } from "@tt/data-access";
import { postsActions } from "./actions";

export interface PostsState {
	posts: Post[]
}

export const initialState: PostsState = {
	posts: []
}

export const postsFeature = createFeature({
	name: 'postsFeature',
	reducer: createReducer(
		initialState,
		on(postsActions.postsLoaded,
			(state, { posts }) => {
				return {
					...state,
					posts
				}
			}
		)
	)
});