import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnswerQuestion } from './AnswerQuestion';
import { ResponseTestQuestion } from '../response/ResponseTestQuestion';
import { DataTmp } from '../../DataTmp';

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

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private service: ApiService, private dataService: DataTmp) {
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
      this.testId = testIdString ? Number(testIdString) : -1;
      this.userId = userIdString ? Number(userIdString) : -1;
    });
     this.loadQuestions(this.testId);
     
  }

  loadQuestions(testId: number): void {
    this.service.getQuestions(testId).subscribe({
      next: (data: AnswerQuestion[]) => {
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
  }

  sendTest(userId:number, testId: number): void {
    console.log('sendTest');
    this.router.navigate(['/response/test/', testId, 'user', userId]);
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
        next: (response: ResponseTestQuestion) => {
          this.dataService.setResponses(response); 
          this.router.navigate(['/response/test/', this.testId, 'user', this.userId]);
        },
        error: (err) => {
          console.error('Error al enviar las respuestas:', err);
          // Puedes agregar lógica para mostrar un mensaje de error al usuario aquí.
        }
        /*,
        complete: () => {
          console.log('Llamada a postAnswers completada');
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
