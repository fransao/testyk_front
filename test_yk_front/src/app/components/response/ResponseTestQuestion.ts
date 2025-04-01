import { AnswerQuestion } from "../question/AnswerQuestion";

export class ResponseTestQuestion {
  idTest: number;
  description: string;
  score: number;
  questions: AnswerQuestion[];

  constructor (idTest: number, description: string, score: number, questions: AnswerQuestion[]) {
    this.idTest = idTest;
    this.description = description;
    this.score = score;
    this.questions = questions;
  }
}