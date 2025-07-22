import { postsFeature } from './reducer';
import { createSelector } from "@ngrx/store";

export const selectPosts = createSelector(
	postsFeature.selectPosts,
	posts => posts
);