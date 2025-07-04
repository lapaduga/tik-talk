import { firstValueFrom } from 'rxjs';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Post, PostComment } from '../../../data/interfaces/post.interface';
import { AvatarCircle } from "../../../common-ui/avatar-circle/avatar-circle";
/* import { DatePipe } from '@angular/common'; */
import { SvgIcon } from '../../../common-ui/svg-icon/svg-icon';
import { PostInput } from "../post-input/post-input";
import { CommentComponent } from "./comment/comment.component";
import { PostService } from '../../../data/services/post.service';
import { TimePassedSince } from "../../../helpers/pipes/date-pipe";

@Component({
  selector: 'app-post',
  imports: [AvatarCircle, /* DatePipe,  */SvgIcon, PostInput, CommentComponent, TimePassedSince],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post = input<Post>();
  postService = inject(PostService);
  comments = signal<PostComment[]>([]);

  ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id));
    this.comments.set(comments);
  }
}
