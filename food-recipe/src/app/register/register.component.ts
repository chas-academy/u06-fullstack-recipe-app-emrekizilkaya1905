import { Component } from '@angular/core';
import { RegisterDetails } from '../register-details';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerDetails: RegisterDetails;

  registeredIn$: Observable<boolean>;

  constructor(private auth: AuthService) {
    this.registerDetails = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
    console.log(this.registerDetails);
  }
  register() {
    this.auth.registerUser(this.registerDetails);
  }
}
