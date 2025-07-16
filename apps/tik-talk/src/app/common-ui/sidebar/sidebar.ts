import { Component, inject } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '@tt/profile';
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
export class Sidebar {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
