import { Globals } from './../utils/Globals';
import { User } from './../user/user.component';
import { Component, OnInit } from '@angular/core';
import UserService from '../../services/user.service';
import { UserModel } from '../../models/user';
import {Router, RouterModule} from '@angular/router';
import {CustomerService} from '../utils/CustomerService';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class Login implements OnInit {
  private user: UserModel;

  private userLogin = {
    mail: "",
    password: ""
  }; 
  
  private loginMessage = "";
  
  constructor (private userServ: UserService, 
               private customer: CustomerService, 
               private router: Router,
               private globals: Globals) {
    }

    ngOnInit (){
    }

    login() {
      this.userServ.getUserByMailAndPassword(this.userLogin.mail, this.userLogin.password).subscribe(
        res => { 
          if (!res.user) {
            this.loginMessage = "Connection failed!";
          }
          else {
            this.user = res.user;
            this.globals.connectedUser = this.user;
            this.customer.setToken(res.user.mail);
            this.router.navigate(['/home']);
          }   
         },
         err => {
          this.loginMessage = "Connection failed!"; 
         }
      );
    }
}