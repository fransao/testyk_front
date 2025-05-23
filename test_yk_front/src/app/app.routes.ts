import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [authGuard], // si tienes un guard
    children: [
      {
        path: 'evaluations',
        loadChildren: () => import('./components/test/test.routes').then(m => m.TEST_ROUTES)
      },
      {
        path: 'response/test/:testId/user/:userId',
        loadChildren: () => import('./components/response/response.routes').then(m => m.RESPONSE_ROUTES)
    },
    {
        path: 'print',
        loadChildren: () => import('./components/print/print.routes').then(m => m.PRINT_ROUTES)
    },
      
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
  /*
    {
        path: '',
        redirectTo: '/login', // Redirige al login si el path está vacío
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard], // Asegura que solo los usuarios autenticados puedan ver el dashboard
      },
    {
        path: 'evaluations',
        loadChildren: () => import('./components/test/test.routes').then(m => m.TEST_ROUTES)
    },
    {
        path: 'evaluation/:testId/user/:userId',
        loadChildren: () => import('./components/question/question.routes').then(m => m.QUESTION_ROUTES)
    },
    {
        path: 'response/test/:testId/user/:userId',
        loadChildren: () => import('./components/response/response.routes').then(m => m.RESPONSE_ROUTES)
    },
    {
        path: 'print',
        loadChildren: () => import('./components/print/print.routes').then(m => m.PRINT_ROUTES)
    },
    */
];
