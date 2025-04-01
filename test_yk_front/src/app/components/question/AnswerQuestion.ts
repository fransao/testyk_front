import { Answer } from "./Answer";

export class AnswerQuestion {
  questionId: string;
  question: string;
  selectedAnswer: number;
  isCorrect: boolean;
  answers: Answer[];

  constructor (questionId: string, question: string, selectedAnswer: number, isCorrect: boolean, answers: Answer[]) {
    this.questionId = questionId;
    this.question = question;
    this.selectedAnswer = selectedAnswer;
    this.isCorrect = isCorrect;
    this.answers = answers;
  }
}