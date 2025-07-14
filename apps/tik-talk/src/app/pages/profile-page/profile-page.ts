import { ProfileService } from './../../data/services/profile.service';
import { Component, inject, signal } from '@angular/core';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap, firstValueFrom } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIcon } from '../../common-ui/svg-icon/svg-icon';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';
import { PostFeed } from './post-feed/post-feed';
import { ChatsService } from '../../data/services/chats.service';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeader,
    AsyncPipe,
    RouterModule,
    SvgIcon,
    ImgUrlPipe,
    PostFeed,
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  route = inject(ActivatedRoute);
  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(5);
  isMyPage = signal(false);
  router = inject(Router);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);

      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChat(userId)).then((res) => {
      this.router.navigate(['/chats', res.id]);
    });
  }
}
