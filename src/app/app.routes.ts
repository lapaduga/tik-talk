import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { SearchPage } from './pages/search-page/search-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { Layout } from './common-ui/layout/layout';
import { canActivateAuth } from './auth/access.guard';
import { SettingsPage } from './pages/settings-page/settings-page';
import { chatsRoutes } from './pages/chats-page/chatsRoutes';

export const routes: Routes = [
	{
		path: '', component: Layout, children: [
			{ path: '', redirectTo: 'profile/me', pathMatch: 'full' },
			{ path: 'search', component: SearchPage },
			{ path: 'profile/:id', component: ProfilePage },
			{ path: 'settings', component: SettingsPage },
			{ path: 'chats', loadChildren: () => chatsRoutes },
		],
		canActivate: [canActivateAuth]
	},
	{ path: 'login', component: LoginPage }
];
