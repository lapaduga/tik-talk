import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsList } from '../chats-list/chats-list';
import { ChatsService } from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chats',
  imports: [RouterOutlet, ChatsList],
  templateUrl: './chats.html',
  styleUrl: './chats.scss',
})
export class ChatsPage {
  #chatsService = inject(ChatsService);

  constructor() {
    this.#chatsService.connectWs()
    .pipe(
      takeUntilDestroyed()
    )
    .subscribe();
  }
}
