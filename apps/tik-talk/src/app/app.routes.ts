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
import { postsFeature, PostsEffects } from '@tt/posts';
import { ExperimentPage, ExperimentEffects, experimentFeature } from '@tt/experiment';
import { totalSubsFeature } from '../../../../libs/experiment/src/lib/experiment/data/store';

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
      {
        path: 'profile/:id',
        component: ProfilePage,
        providers: [
          provideState(postsFeature),
          provideEffects(PostsEffects)
        ]
      },
      { path: 'settings', component: SettingsPage },
      { path: 'chats', loadChildren: () => chatsRoutes },
      { path: 'form', component: FormPage },
      {
        path: 'experiment',
        component: ExperimentPage,
        providers: [
          provideState(experimentFeature),
          provideState(totalSubsFeature),
          provideEffects(ExperimentEffects),
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPage },
];
