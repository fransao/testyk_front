import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Test } from './components/test/Test';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private getTestsUrl     = 'http://localhost:8080/tests';
  private getQuestionsUrl = 'http://localhost:8080/questions';
  private putAnswersUrl   = 'http://localhost:8080/answers';
  
  constructor(private http: HttpClient) {}

  getTests(): Observable<any> { 
    return this.http.post<any>(`${this.getTestsUrl}`,  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
      }),
      mode: 'no-cors',
      responseType: 'json' as 'json'
    }).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() =>error);
      })
    );
  }

  getQuestions(): Observable<any> { 
    return this.http.post<any>(`${this.getQuestionsUrl}`, "");
  }

  postAnswers(data: any): Observable<any> {
    return this.http.post<any>(`${this.putAnswersUrl}`, data)
  }

}
