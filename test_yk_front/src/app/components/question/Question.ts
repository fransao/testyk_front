import { Answer } from "./Answer";

export class Question {
    id: string;
    name: string;
    answers: Answer[];

    constructor (id: string, name: string, answers: Answer[]) {
        this.id = id;
        this.name = name;
        this.answers = answers;
      }
}