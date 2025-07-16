import { Routes } from '@angular/router';
import { canActivateAuth, LoginPage } from '@tt/auth';
import { chatsRoutes } from '@tt/chats';
import { ProfilePage, SettingsPage, SearchPage } from '@tt/profile';
import { FormPage } from '@tt/form';
import { Layout } from '@tt/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'search', component: SearchPage },
      { path: 'profile/:id', component: ProfilePage },
      { path: 'settings', component: SettingsPage },
      { path: 'chats', loadChildren: () => chatsRoutes },
      { path: 'form', component: FormPage },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPage },
];
