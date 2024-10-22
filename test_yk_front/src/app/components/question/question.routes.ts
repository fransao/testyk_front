import { Routes } from '@angular/router';
import { QuestionComponent } from '../question/question.component';

export const QUESTION_ROUTES: Routes = [
    { path: '', component: QuestionComponent }
    //{ path: 'question/:testId', component: QuestionComponent}
];
