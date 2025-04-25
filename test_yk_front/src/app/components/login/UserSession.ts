export class UserSession {
    username: string;
    token: string;
    email: string;
   
    constructor (username: string, token: string, email: string) {
      this.username = username;
      this.token = token;
      this.email = email;
    }
  
  }