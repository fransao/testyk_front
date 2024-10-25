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
  
  }

  ngOnInit(): void {
     this.loadtests();
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

