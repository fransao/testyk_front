import { Test } from './Test';

export class UserTest {
    userId: number;
    userName: string;
    tests: Test[];
   
    constructor (userId: number, userName: string, tests: Test[]) {
      this.userId = userId;
      this.userName = userName;
      this.tests = tests;
    }
  
  }