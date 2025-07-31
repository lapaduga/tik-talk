import { firstValueFrom, Subject, takeUntil, timer } from 'rxjs';
import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { ChatWorkspaceMessage } from './chat-workspace-message/chat-workspace-message';
import { MessageInput } from '../../../ui';
import { Chat, ChatsService } from '@tt/data-access';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessage, MessageInput],
  templateUrl: './chat-workspace-messages-wrapper.html',
  styleUrl: './chat-workspace-messages-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesWrapper implements OnInit, OnDestroy {
  chatService = inject(ChatsService);
  chat = input.required<Chat>();
  messages = this.chatService.activeChatMessages;
  private destroy$ = new Subject<void>();

  startMessagePolling() {
    timer(0, 3000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.chatService.getChatById(this.chat().id);
      });
  }

  ngOnInit(): void {
    this.startMessagePolling();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async onSendMessage(messageText: string) {
    this.chatService.wsAdapter.sendMessage(
      messageText,
      this.chat().id
    );
/*     await firstValueFrom(
      this.chatService.sendMessage(this.chat().id, messageText)
    ); */
    await firstValueFrom(this.chatService.getChatById(this.chat().id));
  }
}
