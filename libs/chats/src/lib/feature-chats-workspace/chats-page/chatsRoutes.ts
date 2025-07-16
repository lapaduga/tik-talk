import { Route } from '@angular/router';
import { ChatsPage } from './chats';
import { ChatWorkspace } from '..';

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPage,
    children: [{ path: ':id', component: ChatWorkspace }],
  },
];
