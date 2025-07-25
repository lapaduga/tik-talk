import { ChatWSMessage, ChatWSNewMessage, ChatWSUnreadMessage } from "../interfaces";

export const isUnreadMessage = (message: ChatWSMessage): message is ChatWSUnreadMessage => {
  return 'action' in message && message.action === 'unread';
}

export const isNewMessage = (message: ChatWSMessage): message is ChatWSNewMessage => {
  return 'action' in message && message.action === 'message';
}