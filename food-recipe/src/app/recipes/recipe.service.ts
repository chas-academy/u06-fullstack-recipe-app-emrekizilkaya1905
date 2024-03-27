import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  baseUrl = 'https://api.edamam.com/api/recipes/v2';
  type = 'public';
  app_key = '4c3db6ca4d77ce08271c0f62b1f83564';
  app_id = '48d66f37';

  private httpOptions = {
    headers: new HttpHeaders({
      accept: 'application/json',
      'Accept-Language': 'en',
    }),
  };

  constructor(private http: HttpClient) {}
  getRecipes(
    q?: string,
    mealType?: string,
    dishType?: string,
    diet?: string,
    cuisineType?: string
  ) {
    let searchquery =
      this.baseUrl +
      '?type=' +
      this.type +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key;

    if (q) {
      searchquery += '&q=' + encodeURIComponent(q);
    }

    if (dishType) {
      searchquery += '&dishType=' + encodeURIComponent(dishType);
    }

    if (mealType) {
      searchquery += '&mealType=' + mealType;
    }
    if (diet) {
      searchquery += '&diet=' + diet;
    }
    if (cuisineType) {
      searchquery += '&cuisineType=' + encodeURIComponent(cuisineType);
    }
    console.log(searchquery);
    return this.http
      .get<any>(searchquery, this.httpOptions)
      .pipe(catchError(this.handleError));
    // console.log(searchquery);
  }

  idGetRecipes(id: string) {
    const recipeId =
      this.baseUrl +
      '/' +
      id +
      '?type=' +
      this.type +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key;
    console.log('Recipe ID:', recipeId);
    console.log();
    return this.http
      .get<any>(recipeId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
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
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
