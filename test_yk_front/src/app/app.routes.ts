import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'test',
        loadChildren: () => import('./components/test/test.routes').then(m => m.TEST_ROUTES)
    },
    {
        path: 'print',
        loadChildren: () => import('./components/print/print.routes').then(m => m.PRINT_ROUTES)
    },
];
