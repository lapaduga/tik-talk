import { map, switchMap } from 'rxjs';
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "@tt/data-access";
import { postsActions } from './actions';

@Injectable({
	providedIn: 'root'
})
export class PostsEffects {
	postService = inject(PostService);
	actions$ = inject(Actions);

	fetchPosts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(postsActions.fetchPosts),
			switchMap(() => {
				return this.postService.fetchPosts();
			}),
			map(posts => postsActions.postsLoaded({ posts: posts }))
		);
	});
}