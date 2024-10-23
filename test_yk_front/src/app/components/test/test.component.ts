import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { UserTest } from './UserTest';
import { Router, RouterLink } from '@angular/router';
import { log } from 'console';

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
    this.service.getTests().subscribe({
      next: (data: UserTest[]) => {
        console.log(data);
        this.userTests = data;
      }, error: (err) => console.log(err)
    });
  }
/*
  loadQuestions(): void {
    this.service.getQuestions().subscribe({
      next: (data: any) => {
        console.log(data);
      }, error: (err) => console.log(err)
    });
    
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.formulario.patchValue({
      archivo: file
    });
  }
    */
}
