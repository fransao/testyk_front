import { Answer } from "./Answer";

export class AnswerQuestion {
  questionId: string;
  question: string;
  selectedAnswer: number;
  answers: Answer[];

  constructor (questionId: string, question: string, selectedAnswer: number, answers: Answer[]) {
    this.questionId = questionId;
    this.question = question;
    this.selectedAnswer = selectedAnswer;
    this.answers = answers;
  }
}