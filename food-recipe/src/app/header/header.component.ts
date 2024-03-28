import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  collapsed = true;
  protected loggedIn: boolean;

  constructor(private AuthService: AuthService) {
    this.AuthService.loggedIn$.subscribe((res) => {
      this.loggedIn = res;
    });
  }

  logoutHeader() {
    this.AuthService.logOut();
  }
}
