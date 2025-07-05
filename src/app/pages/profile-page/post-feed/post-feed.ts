import {
  Component,
  ElementRef,
  inject,
  Renderer2
} from '@angular/core';
import { PostInput } from "../post-input/post-input";
import { PostComponent } from "../post/post.component";
import { PostService } from '../../../data/services/post.service';
import { firstValueFrom, fromEvent, debounceTime } from 'rxjs';
import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-post-feed',
  imports: [PostInput, PostComponent],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed {
  postService = inject(PostService);
  feed = this.postService.posts;
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  profile = inject(ProfileService).me;

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
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
    this.r2.setStyle(this.hostElement.nativeElement, 'maxHeight', `${height}px`);
  }

  loadPosts() {
    firstValueFrom(this.postService.fetchPosts())
      .then(posts => {
        this.feed.set(posts);
      });
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    firstValueFrom(this.postService.createPost({
      title: 'Клевый пост',
      content: postText,
      authorId: this.profile()!.id
    })).then(() => {
      this.loadPosts();
    });
  }
}
