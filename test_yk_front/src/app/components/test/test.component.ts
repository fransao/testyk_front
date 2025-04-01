import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { UserTest } from './UserTest';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
 
  public userTests: UserTest[] = [];

  constructor(private fb: FormBuilder, private service: ApiService, private router: Router) {

    this.userTests = [];
   }

  ngOnInit(): void {
     this.loadtests();
  }

  seeQuestions(userId:number, testId: number): void {
    this.router.navigate(['/evaluation', testId, '/user', userId]);
  }

  
  loadtests(): void {
    this.service.getTests().subscribe({
      next: (data: UserTest[]) => {
        this.userTests = data;
      }, error: (err) => console.log(err)
    });
  }
}
