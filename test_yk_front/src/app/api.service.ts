import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserTest } from './components/test/UserTest';
import { AnswerQuestion } from './components/question/AnswerQuestion';
import { format } from 'date-fns';
import { ResponseTestQuestion } from './components/response/ResponseTestQuestion';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  /* test soapui
  private getTestsUrl     = 'http://localhost:8080/tests';
  private getQuestionsUrl = 'http://localhost:8080/questions';
  private putAnswersUrl   = 'http://localhost:8080/answers';
  */

  private logingUrl              = 'http://localhost:8080/course/user/login'
  private registerUrl            = 'http://localhost:8080/course/user/register'
  private getTestsUrl            = 'http://localhost:8080/course/user/tests';
  private getQuestionsUrl        = 'http://localhost:8080/course/answers/question?';
  private postAnswersUrl         = 'http://localhost:8080/course/validate/answers/test';
  private getApprovedTestsUrl    = 'http://localhost:8080/course/user/tests/approved';
  private downloadCertificateUrl = 'http://localhost:8080/course/certificate/user/';
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    
    return this.http.post<any>(`${this.logingUrl}`, body).pipe(
      catchError(error => {
        console.error('[login] Error occurred: ', error);
        return throwError(() => error);
      })
    );
  }

  
  getTests(): Observable<UserTest[]> { 
    return this.http.get<UserTest[]>(`${this.getTestsUrl}`).pipe(
      catchError(error => {
        console.error('[getTests] Error occurred: ', error);
        return throwError(() =>error);
      })
    );
  }

  getApprovedUserTests(): Observable<UserTest[]> { 
    return this.http.get<UserTest[]>(`${this.getApprovedTestsUrl}`).pipe(
      catchError(error => {
        console.error('[getApprovedUserTests] Error occurred: ', error);
        return throwError(() =>error);
      })
    );
  }

  downloadCertificate(user:number, test: number): void {
    const endpoint = `${this.downloadCertificateUrl}${user}/test/${test}`;
    this.http.post(`${endpoint}`, null, { responseType: 'blob' })
    .subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = test+'_'+ format(new Date(), 'dd/MM/yyyy')+'.pdf'; // Name of the file to download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('[downloadCertificate] Download error:', error);
    });
  }

  getQuestions(testId: number): Observable<AnswerQuestion[]> { 
    const params = new HttpParams()
            .append('testID', testId);
    return this.http.get<AnswerQuestion[]>(`${this.getQuestionsUrl}`, {
      params: params,
  }).pipe(
      catchError(error => {
        console.error('[getQuestions] Error occurred:', error);
        return throwError(() =>error);
      })
    );
  }

  postAnswers(userId: number, testId: number, data: AnswerQuestion[]): Observable<ResponseTestQuestion> {
    const params = new HttpParams()
            .append('userID', userId)
            .append('testID', testId);
    return this.http.post<ResponseTestQuestion>(`${this.postAnswersUrl}`, data, {
      params: params,
  })
  }
}
