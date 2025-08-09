import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/setting.component').then(m => m.SettingComponent),
    children: [
      { path: '',
        loadComponent: () => import('./pages/settings/theme/theme.component').then(m => m.ThemeComponent)
      },
    ]
  },
  { path: '', redirectTo: '/settings', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
