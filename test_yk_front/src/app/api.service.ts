import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserTest } from './components/test/UserTest';
import { AnswerQuestion } from './components/question/AnswerQuestion';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  /* test soapui
  private getTestsUrl     = 'http://localhost:8080/tests';
  private getQuestionsUrl = 'http://localhost:8080/questions';
  private putAnswersUrl   = 'http://localhost:8080/answers';
  */

  private getTestsUrl     = 'http://localhost:8080/course/user/tests';
  private getQuestionsUrl = 'http://localhost:8080/course/answers/question?';
  private postAnswersUrl  = 'http://localhost:8080/course/validate/answers/test';
  
  constructor(private http: HttpClient) {}

  
  getTests(): Observable<UserTest[]> { 
    return this.http.get<UserTest[]>(`${this.getTestsUrl}`).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() =>error);
      })
    );
  }

  getQuestions(testId: number): Observable<AnswerQuestion[]> { 
    const params = new HttpParams()
            .append('testID', testId);
    return this.http.get<AnswerQuestion[]>(`${this.getQuestionsUrl}`, {
      params: params,
  }).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() =>error);
      })
    );
  }

  postAnswers(userId: number, testId: number, data: AnswerQuestion[]): Observable<AnswerQuestion[]> {
    const params = new HttpParams()
            .append('userID', userId)
            .append('testID', testId);
    return this.http.post<AnswerQuestion[]>(`${this.postAnswersUrl}`, data, {
      params: params,
  })
  }
}
