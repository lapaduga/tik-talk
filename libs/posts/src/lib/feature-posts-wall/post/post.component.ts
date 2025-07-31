import { firstValueFrom } from 'rxjs';
import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { Post, PostComment, PostService, ProfileService } from '@tt/data-access';
import { AvatarCircleComponent, SvgIconComponent, TimePassedSincePipe } from '@tt/common-ui';
import { CommentComponent, PostInputComponent } from '../../ui';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    TimePassedSincePipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  post = input<Post>();
  postService = inject(PostService);
  comments = signal<PostComment[]>([]);
  profile = inject(ProfileService).me;

  ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(commentText: string) {
    firstValueFrom(
      this.postService.createComment({
        text: commentText,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      })
    ).then(async () => {
      const comments = await firstValueFrom(
        this.postService.getCommentsByPostId(this.post()!.id)
      );
      this.comments.set(comments);
    });

    return;
  }
}
