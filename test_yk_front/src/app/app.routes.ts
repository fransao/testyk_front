import { Routes } from '@angular/router';

export const routes: Routes = [
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
];
