export class Test {
    id: number;
    description: string;
    status: string;
    dateExpiration: string;
    lastScore: number;

    constructor (id: number, description: string, status: string, dateExpiration: string, lastScore: number) {
        this.id = id;
        this.description = description;
        this.status = status;
        this.dateExpiration = dateExpiration;
        this.lastScore = lastScore;
    }
}
