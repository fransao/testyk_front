import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseTestQuestion } from './ResponseTestQuestion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
  @Input() message: string = ''; // Input property to receive the response message
  public responses: any = null;
  formulario: FormGroup;

  constructor(private fb: FormBuilder,  private router: Router) {
    this.formulario = this.fb.group({
      answers: this.fb.array([])
    });
  }

  ngOnInit() {
    // Obtiene las respuestas del estado de la navegación
    this.responses = this.router.getCurrentNavigation()?.extras.state?.['responses'];
    console.log('responses::::::: ' + this.responses)
  }

  onSubmit() {
    console.log('Home');
          this.router.navigate(['']);
  }
}
