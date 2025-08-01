import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterModule } from '@angular/router';
import { firstValueFrom, Subscription, timer } from 'rxjs';
import { ChatsService, isErrorMessage, ProfileService } from '@tt/data-access';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-sidebar',
  imports: [
    SvgIconComponent,
    NgFor,
    SubscriberCard,
    RouterModule,
    AsyncPipe,
    ImgUrlPipe,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar implements OnInit {
  profileService = inject(ProfileService);
  chatService = inject(ChatsService);
  destroyRef = inject(DestroyRef);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;
  unreadMessagesCount = this.chatService.unreadMessagesCount;
  wsSubscribe!: Subscription;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
      showCount: false
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats',
      showCount: true
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
      showCount: false
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
    this.connectWs();
    /*     this.chatService.connectWs()
          .pipe(
            takeUntilDestroyed()
          )
          .subscribe(); */
  }

  async reconnect() {
    console.log('Соединение...');
    await firstValueFrom(this.profileService.getMe());
    await firstValueFrom(timer(2000));
    this.connectWs();
  }

  connectWs(): void {
    this.wsSubscribe?.unsubscribe();
    this.wsSubscribe = this.chatService.connectWs()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(message => {
        if (isErrorMessage(message)) {
          console.log('Неверный токен');
          this.reconnect();
        }
      });
  }
}
