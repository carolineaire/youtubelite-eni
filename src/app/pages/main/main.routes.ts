import { Routes } from "@angular/router";

export const MAIN_ROUTES: Routes = [
    {path: '', loadComponent: () => import('./home/home').then(m => m.Home)},
    {path: 'about', loadComponent: () => import('./about/about').then(m => m.About)},
]