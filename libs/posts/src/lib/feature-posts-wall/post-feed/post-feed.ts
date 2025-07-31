import { Component, ElementRef, inject, Renderer2, AfterViewInit, Signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fromEvent, debounceTime } from 'rxjs';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '../post/post.component';
import { Post, PostService, ProfileService } from '@tt/data-access';
import { Store } from '@ngrx/store';
import { postsActions, selectPosts } from '../../store';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFeed implements AfterViewInit, OnInit {
  postService = inject(PostService);
  store = inject(Store);
  feed: Signal<Post[]> = this.store.selectSignal(selectPosts);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  profile = inject(ProfileService).me;

  ngOnInit() {
    this.store.dispatch(postsActions.fetchPosts());
  }

  ngAfterViewInit() {
    this.resizeFeed();
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 48;
    this.r2.setStyle(
      this.hostElement.nativeElement,
      'maxHeight',
      `${height}px`
    );
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    this.store.dispatch(postsActions.createPost({
      payload: {
        title: 'Клевый пост',
        content: postText,
        authorId: this.profile()!.id,
      }
    }));
  }
}
