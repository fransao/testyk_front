import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnswerQuestion } from './AnswerQuestion';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  userId !: number;
  testId !: number;
  formulario: FormGroup;
  public questions: AnswerQuestion[] = [];
  public validateRequired: boolean; 
  public sendAnswers: boolean;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private service: ApiService) { 
    this.formulario = this.fb.group({
      answers: this.fb.array([])
    });
    this.validateRequired = false;
    this.sendAnswers = false;
  }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(params => {
      const testIdString = params.get('testId');
      const userIdString = params.get('userId');
      console.error('testIdString is:' + testIdString);
      console.error('userIdString is:' + userIdString);
      this.testId = testIdString ? Number(testIdString) : -1;
      this.userId = userIdString ? Number(userIdString) : -1;
    });
    /*
    console.error('testId is:' + this.router.snapshot.paramMap.get('testId'));
    console.error('userId is:' + this.router.snapshot.paramMap.get('userId'));
    */
     this.loadQuestions(this.testId);
     console.log("questions: " + this.questions)
     
  }

  loadQuestions(testId: number): void {
    this.service.getQuestions(testId).subscribe({
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

  sendTest(userId:number, testId: number): void {
    console.log('sendTest');
    this.router.navigate(['/response/test/', testId, 'user', userId]);
  }

  saveAnswers(testId: string): void {
    console.log('saveAnswer');
    //this.router.navigate(['/answer', testId]);
  }

  onSubmit() {
    console.log('onSubmit');
    if (this.formulario.valid) {
      // Aquí puedes manejar el valor de las respuestas
      const selectedAnswers = this.formulario.value.answers;
      console.log('Respuestas seleccionadas:', selectedAnswers);
      // Aquí puedes enviar `selectedAnswers` a un servicio o procesarlo como necesites
      this.validateRequired = false;
      this.sendAnswers = true;
      this.service.postAnswers(this.userId, this.testId, this.questions).subscribe({
        next: (data: AnswerQuestion[]) => {
          const responses = data;
          this.questions = data;
          //this.addControls();
          console.log('Respuesta recibida:', data);
          this.router.navigate(['/response/test/', this.testId, 'user', this.userId],  { state: {responses: data } });
          // Puedes agregar una notificación de éxito aquí, si es necesario.
        },
        error: (err) => {
          console.error('Error al enviar las respuestas:', err);
          // Puedes agregar lógica para mostrar un mensaje de error al usuario aquí.
        }
        /*
        ,
        complete: () => {
          console.log('Llamada a postAnswers completada');
          // Aquí puedes realizar acciones adicionales una vez que la llamada se complete.
        }
          */
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
