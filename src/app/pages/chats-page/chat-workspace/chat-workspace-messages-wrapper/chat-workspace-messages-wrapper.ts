import { firstValueFrom } from 'rxjs';
import { Component, inject, input, signal } from '@angular/core';
import { ChatWorkspaceMessage } from "./chat-workspace-message/chat-workspace-message";
import { MessageInput } from "../../../../common-ui/message-input/message-input";
import { ChatsService } from '../../../../data/services/chats.service';
import { Chat, Message } from '../../../../data/interfaces/chats.interface';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessage, MessageInput],
  templateUrl: './chat-workspace-messages-wrapper.html',
  styleUrl: './chat-workspace-messages-wrapper.scss'
})
export class ChatWorkspaceMessagesWrapper {
  chatService = inject(ChatsService);
  chat = input.required<Chat>();
  messages = this.chatService.activeChatMessages;

  async onSendMessage(messageText: string) {
    await firstValueFrom(this.chatService.sendMessage(this.chat().id, messageText));
    await firstValueFrom(this.chatService.getChatById(this.chat().id));
  }
}
