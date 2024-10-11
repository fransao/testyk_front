import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Question } from './Question';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  formulario: FormGroup;
  testId: string = "";
  public questions: Question[] = [];

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private service: ApiService) { 
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
     //this.loadtests();
     this.testId = String(this.router.snapshot.paramMap.get('id'));
    console.error('test id is:',this.testId);
    //this.service.getQuestions(this.testId).subscribe(questions => {
      //this.questions = questions;
    //});
     this.questions = [
      {id: "1", name: "¿Cuál es la principal prioridad al conducir un autobús en áreas residenciales?", answers:[
        {id:"1", name:"Mantener una velocidad constante sin importar el límite de velocidad."},
        {id: "2", name:"Asegurarse de que todos los pasajeros estén sentados antes de avanzar."},
        {id:"3", name: "Reducir la velocidad y estar atento a los peatones y a los niños que pueden cruzar la calle."}
      ]},
      {id: "2", name: "¿Qué debe hacer un conductor si se aproxima a una señal de pare en una intersección sin visibilidad?", answers:[
        {id:"1", name: "Pasar rápidamente para evitar retrasos."},
        {id:"2", name: "Detenerse completamente, revisar a ambos lados y avanzar con precaución."}]},
     ]
  }

  saveAnswers(testId: string): void {
    //this.router.navigate(['/answer', testId]);
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    }
  }
  
}
