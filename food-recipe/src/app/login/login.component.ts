import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginDetails } from '../interfaces/login-details';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginDetails: LoginDetails;

  loggedIn$: Observable<boolean>;

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: '',
      password: '',
    };

    console.log(this.loginDetails);

    this.loggedIn$ = this.auth.loggedIn$;
  }

  login() {
    this.auth.loginUser(this.loginDetails);
    // console.log('Emre');
  }
  logout() {
    this.auth.logOut();
  }
}
