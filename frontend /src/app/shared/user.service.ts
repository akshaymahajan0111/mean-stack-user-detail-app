import { Injectable } from '@angular/core';
import { User } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  selectedUser: User = {
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    profilePicture:''
  };

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  getUsers() {
    return this.http.get(environment.apiBaseUrl + '/listUsers');
  }

}
