import { UserModel } from './../../models/user';
import {Injectable} from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  getToken(): UserModel {
    return JSON.parse(localStorage.getItem(TOKEN));
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}