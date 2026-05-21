import { Routes } from '@angular/router';
import { Player } from './pages/player/player';

export const routes: Routes = [
    {path: '', loadChildren: () => import('./pages/main/main.routes').then(m => m.MAIN_ROUTES)},
    {path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)},
    {path: 'profile', loadChildren: () => import('./pages/users/user.routes').then(m => m.USER_ROUTES)},
    {path: 'player', component: Player },
    {path: '**', redirectTo: ''}
];
