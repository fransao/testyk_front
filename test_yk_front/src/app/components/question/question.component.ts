import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnswerQuestion } from './AnswerQuestion';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  @Input() userId: number = -1;
  @Input() testId: number = -1;
  formulario: FormGroup;
  public questions: AnswerQuestion[] = [];
  public validateRequired: boolean; 
  public sendAnswers: boolean;

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private service: ApiService) { 
    this.formulario = this.fb.group({
      answers: this.fb.array([])
    });
    this.validateRequired = false;
    this.sendAnswers = false;
  }

  ngOnInit(): void {
     this.loadQuestions();
     console.log("questions: " + this.questions)
     this.userId = Number(this.router.snapshot.paramMap.get('userId'));
     this.testId = Number(this.router.snapshot.paramMap.get('testId'));
     console.error('test id is:' + this.testId);
  }

  loadQuestions(): void {
    this.service.getQuestions().subscribe({
      next: (data: AnswerQuestion[]) => {
        console.log(data);
        this.questions = data;
        this.addControls();
      }, error: (err) => console.log(err)
    });
  }

  addControls() {
    const answersArray = this.formulario.get('answers') as FormArray;
    answersArray.clear();
    this.questions.forEach(() => {
        answersArray.push(this.fb.control('', Validators.required)); // Crea un control vacío para cada pregunta
    });
    console.log("answers array validation: " + answersArray);
  }

  saveAnswers(testId: string): void {
    //this.router.navigate(['/answer', testId]);
  }

  onSubmit() {
    if (this.formulario.valid) {
      // Aquí puedes manejar el valor de las respuestas
      const selectedAnswers = this.formulario.value.answers;
      console.log('Respuestas seleccionadas:', selectedAnswers);
      // Aquí puedes enviar `selectedAnswers` a un servicio o procesarlo como necesites
      this.validateRequired = false;
      this.sendAnswers = true;
      this.service.postAnswers(this.userId, this.testId, this.questions).subscribe({
        next: (data: AnswerQuestion[]) => {
          console.log('Respuesta recibida:', data);
          this.questions = data;
          this.addControls();
          // Puedes agregar una notificación de éxito aquí, si es necesario.
        },
        error: (err) => {
          console.error('Error al enviar las respuestas:', err);
          // Puedes agregar lógica para mostrar un mensaje de error al usuario aquí.
        },
        complete: () => {
          console.log('Llamada a postAnswers completada');
          // Aquí puedes realizar acciones adicionales una vez que la llamada se complete.
        }
      });
    } else {
      this.validateRequired = true;
      console.log('Hay preguntas sin responser');
      this.formulario.markAllAsTouched(); // Marca todos los controles como tocados
    }
  }

  getAnswerControl(index: number) {
    return (this.formulario.get('answers') as FormArray).at(index);
  }
  
}
