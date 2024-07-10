import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    data: {
      title: 'Authenticate 1',
    },
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'loginalt',
    data: {
      title: 'Authenticate 2',
    },
    loadComponent: () =>
      import('./pages/auth/login-alternate/login-alternate.component').then(
        (m) => m.LoginAlternateComponent
      ),
  },
  {
    path: 'pages',
    loadComponent: () =>
      import('./components/sidebar/sidebar.component').then(
        (m) => m.SidebarComponent
      ),
    children: [
      {
        path: '',
        data: {
          title: 'Dashboard',
        },
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'components',
        data: {
          title: 'Components',
        },
        loadComponent: () =>
          import('./pages/component-preview/component-preview.component').then(
            (m) => m.ComponentPreviewComponent
          ),
      }
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
