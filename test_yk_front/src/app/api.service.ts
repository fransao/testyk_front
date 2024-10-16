import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getTestsUrl     = 'http://localhost:8080/course/user/tests?userID=1234';
  private getQuestionsUrl = 'http://localhost:8080/course/answers/question?questionID=1';
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

  getQuestions(): Observable<AnswerQuestion[]> { 
    return this.http.get<AnswerQuestion[]>(`${this.getQuestionsUrl}`).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() =>error);
      })
    );
  }

  postAnswers(data: UserTest[]): Observable<UserTest[]> {
    return this.http.post<UserTest[]>(`${this.postAnswersUrl}`, data)
  }
}
