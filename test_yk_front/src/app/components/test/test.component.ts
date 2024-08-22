import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  formulario: FormGroup;
  public tests: Array<any> = [];

  constructor(private fb: FormBuilder, private service: ApiService) {
    this.formulario = this.fb.group({
      texto: ['', Validators.required],
      question_1: ['', Validators.required],
      question_2: ['', Validators.required],
      question_3: ['', Validators.required],
      question_4: ['', Validators.required],
      question_5: ['', Validators.required],
      seleccion: ['opcion1', Validators.required],
      fecha: [null, Validators.required],
      archivo: [null]
    });
  }

  ngOnInit(): void {
    this.loadtests();
  }
  loadtests(): void {
    this.service.getTests().subscribe({
      next: (data: any) => {
        //console.log(data);
        this.tests = data;
      }, error: (err) => console.log(err)
    });
  }

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
}
