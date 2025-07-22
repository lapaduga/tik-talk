import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Post, PostComment } from "@tt/data-access";

export const postsActions = createActionGroup({
	source: 'posts',
	events: {
		'fetch posts': emptyProps(),
		'posts loaded': props<{ posts: Post[] }>(),
		'create post': props<{ post: Post }>(),
		'create comment': props<{ comment: PostComment }>(),
		'comments loaded': props<{ postId: number, comments: PostComment[] }>(),
	}
});