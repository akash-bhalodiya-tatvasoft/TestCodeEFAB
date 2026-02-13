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
      {
        path: 'country',
        loadComponent: () =>
          import('../app/features/country/pages/country-list/country-list').then(
            (m) => m.CountryList
          ),
      },
      // Route for creating a new Country
      {
        path: 'country/add',
        loadComponent: () =>
          import('../app/features/country/pages/country-form/country-form').then(
            (m) => m.CountryForm
          ),
        data: { mode: 'create' },
      },
      // Route for update Country
      {
        path: 'country/edit/:id',
        loadComponent: () =>
          import('../app/features/country/pages/country-form/country-form').then(
            (m) => m.CountryForm
          ),
        data: { mode: 'edit' },
      },
      // Route for view Country
      {
        path: 'country/view/:id',
        loadComponent: () =>
          import('../app/features/country/pages/country-form/country-form').then(
            (m) => m.CountryForm
          ),
        data: { mode: 'view' },
      },
      {
        path: 'state',
        loadComponent: () =>
          import('../app/features/state/pages/state-list/state-list').then((m) => m.StateList),
      },
      {
        path: 'state/add',
        loadComponent: () => import('../app/features/state/pages/state-form/state-form').then(m => m.StateForm),
        data: {mode: 'create' }
      },
      // Route for update State
      {
        path: 'state/edit/:id',
        loadComponent: () => import('../app/features/state/pages/state-form/state-form').then(m => m.StateForm),
        data: {mode: 'edit' }
      },
      // Route for view State
      {
        path: 'state/view/:id',
        loadComponent: () => import('../app/features/state/pages/state-form/state-form').then(m => m.StateForm),
        data: {mode: 'view' }
      }
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
