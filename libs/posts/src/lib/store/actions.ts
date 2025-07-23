import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CommentCreateDto, Post, PostComment, PostCreateDto } from "@tt/data-access";

export const postsActions = createActionGroup({
	source: 'posts',
	events: {
		'fetch posts': emptyProps(),
		'posts loaded': props<{ posts: Post[] }>(),
		'create post': props<{ payload: PostCreateDto }>(),
	}
});