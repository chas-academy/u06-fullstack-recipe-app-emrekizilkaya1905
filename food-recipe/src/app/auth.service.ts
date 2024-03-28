import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from './login-details';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { Router } from '@angular/router';
import { RegisterDetails } from './register-details';

interface ResultData {
  token: string;
}

// interface RegisterDetails {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = 'http://127.0.0.1:8000/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private route: Router) {}

  getLoginStatus() {
    return this.loggedIn.value;
  }
  private updateLoginState(loginState: boolean) {
    this.loggedIn.next(loginState);
  }

  loginUser(loginDetails: LoginDetails) {
    this.http
      .post<ResultData>(this.baseUrl + 'login', loginDetails, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        console.log(result);
        this.updateLoginState(true);
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer ' + result.token
        );
        console.log('You logged in!');
        this.route.navigateByUrl('');
      });
  }

  registerUser(RegisterDetails: RegisterDetails) {
    this.http
      .post<ResultData>(
        this.baseUrl + 'register',
        RegisterDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        console.log(result);
        this.updateLoginState(true);
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer ' + result.token
        );
        console.log('You registered!');
        this.route.navigateByUrl('');
      });
  }

  logOut() {
    this.http
      .post<ResultData>(this.baseUrl + 'logout', {}, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        console.log(result);
        this.updateLoginState(false);
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer '
        );
      });
  }

  // getUser2(): Observable<User[]> {
  //   return this.http.get<User[]>(this.baseUrl + 'getuser/12', this.httpOptions);
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
