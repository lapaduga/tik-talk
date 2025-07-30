import { Component, inject, OnInit, signal } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ChatsService, ProfileService } from '@tt/data-access';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'app-sidebar',
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
})
export class Sidebar implements OnInit {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;
  chatService = inject(ChatsService);
  unreadMessagesCount = this.chatService.unreadMessagesCount;

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
  }
}
