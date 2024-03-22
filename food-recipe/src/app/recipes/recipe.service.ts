import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipeService {
  private recipe: Recipe = {
    id: '',
    label: '',
    dishType: [],
    ingredients: [],
    image: { url: '', width: 0, height: 0 },
    mealType: [],
    dietLabels: [],
    cautions: [],
  };

  private recipes: Recipe[] = [];
  private baseUrl =
    'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=48d66f37&app_key=4c3db6ca4d77ce08271c0f62b1f83564';
  private app_key = '4c3db6ca4d77ce08271c0f62b1f83564';
  private app_id = '48d66f37';

  private httpOptions = {
    headers: new HttpHeaders({
      accept: 'application/json',
      'Accept-Language': 'en',
    }),
  };

  constructor(private http: HttpClient) {}
  getRecipes(searchterm: string): Observable<Recipe[]> {
    let url =
      this.baseUrl +
      '&q=' +
      searchterm +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key;
    return this.http.get<any>(url, this.httpOptions).pipe(
      map((response) => {
        return response.hits.map((hit) => {
          const recipeData = hit.recipe;
          console.log(recipeData);
          return new Recipe(
            recipeData.uri.split('_')[1],
            recipeData.label,
            recipeData.dishType,
            recipeData.ingredients,
            recipeData.image,
            recipeData.mealType,
            recipeData.dietLabels,
            recipeData.cautions
          );
        });
      })
    );
  }

  getRecipe(index: string): Observable<Recipe> {
    console.log(index);
    return this.http
      .get<any>(
        'https://api.edamam.com/api/recipes/v2/' +
          index +
          '?type=public&q=chicken&app_id=48d66f37&app_key=4c3db6ca4d77ce08271c0f62b1f83564',
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          console.log(data);
          const recipeData = data.recipe;
          return new Recipe(
            recipeData.uri.split('_')[1],
            recipeData.label,
            recipeData.dishType,
            recipeData.ingredients,
            recipeData.image,
            recipeData.mealType,
            recipeData.dietLabels,
            recipeData.cautions
          );
        })
      );
  }
}
