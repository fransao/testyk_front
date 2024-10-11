import { Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { QuestionComponent } from '../question/question.component';

export const TEST_ROUTES: Routes = [
    { path: '', component: TestComponent }
    //{ path: 'question/:id', component: QuestionComponent },
    //{ path: '**', redirectTo: '' }
];