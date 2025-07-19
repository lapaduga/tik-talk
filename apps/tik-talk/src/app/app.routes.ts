import { Routes } from '@angular/router';
import { canActivateAuth, LoginPage } from '@tt/auth';
import { chatsRoutes } from '@tt/chats';
import {
  ProfilePage,
  SettingsPage,
  SearchPage,
  profileFeature,
  ProfileEffects
} from '@tt/profile';
import { FormPage } from '@tt/form';
import { Layout } from '@tt/layout';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'search',
        component: SearchPage,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      { path: 'profile/:id', component: ProfilePage },
      { path: 'settings', component: SettingsPage },
      { path: 'chats', loadChildren: () => chatsRoutes },
      { path: 'form', component: FormPage },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPage },
];
