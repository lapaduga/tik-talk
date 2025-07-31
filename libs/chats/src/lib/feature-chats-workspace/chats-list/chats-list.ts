import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatsBtn } from '../chats-btn/chats-btn';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { ChatsService } from '@tt/data-access';

@Component({
  selector: 'app-chats-list',
  imports: [
    ChatsBtn,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './chats-list.html',
  styleUrl: './chats-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsList {
  chatsService = inject(ChatsService);
  filterChatsControl = new FormControl('');
  chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) => {
          return chats.filter((chat) => {
            return (
              `${chat.userFrom.lastName} ${chat.userFrom.firstName}`
                .toLowerCase()
                .includes(inputValue!.toLowerCase()) || null
            );
          });
        })
      );
    })
  );
}
