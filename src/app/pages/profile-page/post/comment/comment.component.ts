import { Component, input } from '@angular/core';
import { PostComment } from '../../../../data/interfaces/post.interface';
import { AvatarCircle } from "../../../../common-ui/avatar-circle/avatar-circle";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircle, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<PostComment>();
}
