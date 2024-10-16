import { Test } from './Test';

export class UserTest {
    userId: number;
    tests: Test[];
   
    constructor (userId: number, tests: Test[]) {
      this.userId = userId;
      this.tests = tests;
    }
  
  }