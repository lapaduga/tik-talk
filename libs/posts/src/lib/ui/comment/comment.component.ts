import { Component, input } from '@angular/core';
import { PostComment } from '../../data';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components';
import { TimePassedSincePipe } from 'libs/common-ui/src/lib/pipes';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, TimePassedSincePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
