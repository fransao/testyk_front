import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Test } from './components/test/Test';

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

  
  getTests(): Observable<Test[]> { 
    return this.http.post<Test[]>(`${this.getTestsUrl}`,  {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':	'GET, POST',
        'Access-Control-Allow-Headers':	'*'
      }),
      mode: 'no-cors',
      responseType: 'json'
    }).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() =>error);
      })
    );
  }

  getQuestions(): Observable<Test[]> { 
    return this.http.post<Test[]>(`${this.getQuestionsUrl}`, "");
  }

  postAnswers(data: Test[]): Observable<Test[]> {
    return this.http.post<Test[]>(`${this.postAnswersUrl}`, data)
  }
}
