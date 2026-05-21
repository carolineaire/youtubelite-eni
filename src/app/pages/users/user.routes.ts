import { Routes } from "@angular/router";

export const USER_ROUTES: Routes = [
    {path: '', loadComponent: () => import('./user-profile/user-profile').then(m => m.UserProfile)},
    {path: 'edit', loadComponent: () => import('./edit-user-profile/edit-user-profile').then(m => m.EditUserProfile)},
]