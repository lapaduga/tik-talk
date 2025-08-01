import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatWorkspaceHeader } from './chat-workspace-header/chat-workspace-header';
import { ChatWorkspaceMessagesWrapper } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChatsService } from '@tt/data-access';

@Component({
  selector: 'tt-chat-workspace',
  imports: [ChatWorkspaceHeader, ChatWorkspaceMessagesWrapper, AsyncPipe],
  templateUrl: './chat-workspace.html',
  styleUrl: './chat-workspace.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspace {
  route = inject(ActivatedRoute);
  chatsService = inject(ChatsService);
  router = inject(Router);

  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter(({ userId }) => userId),
          switchMap(({ userId }) => {
            return this.chatsService.createChat(userId).pipe(
              switchMap(chat => {
                this.router.navigate(['chats', chat.id]);
                return of(null);
              })
            );
          })
        );
      }

      return this.chatsService.getChatById(id);
    })
  );
}
