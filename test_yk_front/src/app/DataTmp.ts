import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTmp {
  private responses: any;

  setResponses(data: any) {
    this.responses = data;
  }

  getResponses() {
    return this.responses;
  }
}
