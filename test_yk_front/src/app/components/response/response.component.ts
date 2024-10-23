import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseTestQuestion } from './ResponseTestQuestion';
import { Router } from '@angular/router';
import { AnswerQuestion } from '../question/AnswerQuestion';

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
 //public responses: ResponseTestQuestion = new ResponseTestQuestion(1, "", 8, AnswerQuestion[]{});
  formulario: FormGroup;

  constructor(private fb: FormBuilder,  private router: Router) {
    this.formulario = this.fb.group({
      answers: this.fb.array([])
    });
  }

  ngOnInit() {
    // Obtiene las respuestas del estado de la navegación
    //this.responses = this.router.getCurrentNavigation()?.extras.state?.['responses'];
    //console.log('responses::::::: ' + this.responses)
    this.responses = {
        "idTest": 1,
        "description": "¿Cuál es la principal prioridad al conducir un autobús en áreas residenciales?",
        "score": 0.0,
        "questions": [
            {
                "questionID": 2,
                "question": "¿Qué debe hacer un conductor si se aproxima a una señal de pare en una intersección sin visibilidad?",
                "selectedAnswer": 1,
                "isCorrect": false,
                "answers": [
                    {
                        "id": 1,
                        "description": "Pasar rápidamente para evitar retrasos."
                    },
                    {
                        "id": 2,
                        "description": "Detenerse completamente, revisar a ambos lados y avanzar con precaución."
                    },
                    {
                        "id": 3,
                        "description": "Continuar sin detenerse si no hay otros vehículos en la intersección."
                    },
                    {
                        "id": 4,
                        "description": "Aumentar la velocidad para cruzar antes de que el semáforo cambie."
                    },
                    {
                        "id": 5,
                        "description": "Utilizar las luces de emergencia para advertir a otros conductores."
                    }
                ]
            },
            {
                "questionID": 1,
                "question": "¿Cuál es la principal prioridad al conducir un autobús en áreas residenciales?",
                "selectedAnswer": 3,
                "isCorrect": false,
                "answers": [
                    {
                        "id": 1,
                        "description": "Mantener una velocidad constante sin importar el límite de velocidad."
                    },
                    {
                        "id": 2,
                        "description": "Asegurarse de que todos los pasajeros estén sentados antes de avanzar."
                    },
                    {
                        "id": 3,
                        "description": "Reducir la velocidad y estar atento a los peatones y a los niños que pueden cruzar la calle."
                    },
                    {
                        "id": 4,
                        "description": "Usar la bocina para advertir a los vehículos cercanos."
                    },
                    {
                        "id": 5,
                        "description": "Mantener el autobús en el centro del carril sin desviarse."
                    }
                ]
            }
        ]
    };
  }

  onSubmit() {
    console.log('Home');
          this.router.navigate(['']);
  }
}
