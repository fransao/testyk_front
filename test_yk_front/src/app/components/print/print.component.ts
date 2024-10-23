import { Component, OnInit } from '@angular/core';
import { UserTest } from '../test/UserTest';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [],
  templateUrl: './print.component.html',
  styleUrl: './print.component.css'
})
export class PrintComponent implements OnInit {
 
  public userTests: UserTest[] = [];

  constructor(private fb: FormBuilder, private service: ApiService, private router: Router, private http: HttpClient) {

    this.userTests = [];
    /*
    [
    {id: "1", name: "Test conductor 1", qualification: 9.8, date: "2024-07-25"},
    {id: "2", name: "Test conductor 2", qualification: 0.0, date: ""},
    {id: "3", name: "Test conductor 3", qualification: 7.3, date: "2024-08-06"},
    {id: "4", name: "Test conductor 4", qualification: 0, date: ""},
    {id: "5", name: "Test conductor 5", qualification: 3.5, date: "2024-07-11"}
   ]
    */
  }

  ngOnInit(): void {
     this.loadtests();
     console.log("user test: " + this.userTests)
  }

  seeQuestions(userId:number, testId: number): void {
    this.router.navigate(['/evaluation', testId, '/user', userId]);
  }

  
  loadtests(): void {
    this.service.getApprovedUserTests().subscribe({
      next: (data: UserTest[]) => {
        console.log(data);
        this.userTests = data;
      }, error: (err) => console.log(err)
    });
  }

  downloadCertificate(user: number, test:number): void {
    this.service.downloadCertificate(user, test);
  }
}

