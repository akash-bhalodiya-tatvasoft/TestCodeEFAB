import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { MyProfile } from './features/my-profile/my-profile';
import { Login } from './features/login/login';
import { MainLayout, AuthLayout } from './core/layouts';
import { APP_ROUTE, GetPageTitle, TITLES } from './shared';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_ROUTE.LOGIN,
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: APP_ROUTE.DASHBOARD,
        component: Dashboard,
        title: GetPageTitle(TITLES.DASHBOARD),
      },
      {
        path: APP_ROUTE.PROFILE,
        component: MyProfile,
        title: GetPageTitle(TITLES.PROFILE),
      },
    ],
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: APP_ROUTE.LOGIN,
        title: GetPageTitle(TITLES.LOGIN),
        component: Login,
      },
    ],
  },
  {
    path: '**',
    redirectTo: APP_ROUTE.LOGIN,
  },
];
