import { createFeature, createReducer, on } from "@ngrx/store";
import { Post, PostComment } from "@tt/data-access";
import { postsActions } from "./actions";

export interface PostsState {
	posts: Post[]
	comments: PostComment[]
}

export const initialState: PostsState = {
	posts: [],
	comments: []
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