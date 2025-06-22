import { Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { PostInput } from "../post-input/post-input";
import { PostComponent } from "../post/post.component";
import { PostService } from '../../../data/services/post.service';
import { firstValueFrom, fromEvent } from 'rxjs';

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

  @HostListener('window.resize')
  onWindowResize() {

  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .subscribe(() => {
        
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 48;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
