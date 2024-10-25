import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseTestQuestion } from './ResponseTestQuestion';
import { Router } from '@angular/router';
import { DataTmp } from '../../DataTmp';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
  public responses: ResponseTestQuestion;
  //formulario: FormGroup;

  constructor(private fb: FormBuilder,  private router: Router, private dataService: DataTmp) {
    console.log('Se ejecuto el contructor, response:   ' + this.dataService.getResponses());
    this.responses = this.dataService.getResponses();
    if (this.responses === undefined) {
        this.responses = new ResponseTestQuestion(-1, "", -1, []);
    }
    /*
    this.formulario = this.fb.group({
      answers: this.fb.array([])
    });
    */
  }

  onSubmit() {
    console.log('Home');
          this.router.navigate(['/#']);
  }
}
