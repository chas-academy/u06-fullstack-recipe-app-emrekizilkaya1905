import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

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
    totalTime: 0,
  };

  private recipes: Recipe[] = [];
  private baseUrl =
    'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=9bb52f29&app_key=%20c1334239f8df865c87bfa0f1d7bf3429%09&ingr=3-5&cuisineType=American&mealType=Breakfast';
  private app_key = '%20c1334239f8df865c87bfa0f1d7bf3429%09';
  private app_id = '9bb52f29';

  private httpOptions = {
    headers: new HttpHeaders({
      accept: 'application/json',
      'Accept-Language': 'en',
    }),
  };

  constructor(private http: HttpClient) {}
  getRecipes(searchterm: string): Observable<Recipe[]> {
    let quisineType = 'American'; //could be sent as parameter
    let mealType = 'Breakfast'; //could be sent as parameter
    let url =
      this.baseUrl +
      '&q=' +
      searchterm +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key +
      '&cuisineType=' +
      quisineType +
      '&mealType=' +
      mealType;
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
            recipeData.totalTime // Burada Recipe modeline uygun bir şekilde ingredients dizisini oluşturmanız gerekiyor
          );
        });
      })
    );
  }

  getRandomRecipe(): Recipe {
    const randomIndex = Math.floor(Math.random() * this.recipes.length);
    return this.recipes[randomIndex];
  }

  // getRecipe(index: string) {
  //   console.log(index);
  //   this.http
  //     .get(
  //       'https://api.edamam.com/api/recipes/v2/' +
  //         index +
  //         '?type=public&app_id=9bb52f29&app_key=%20c1334239f8df865c87bfa0f1d7bf3429%09',
  //       this.httpOptions
  //     )
  //     .subscribe((data: any) => {
  //       console.log(data);
  //       const recipeData = data.recipe;
  //       this.recipe = new Recipe(
  //         recipeData.uri.split('_')[1],
  //         recipeData.label,
  //         recipeData.dishType,
  //         recipeData.ingredients,
  //         recipeData.image,
  //         recipeData.mealType,
  //         recipeData.totalTime // Burada Recipe modeline uygun bir şekilde ingredients dizisini oluşturmanız gerekiyor
  //       );
  //     });
  //   return this.recipe;
  // }

  getRecipe(index: string): Observable<Recipe> {
    console.log(index);
    return this.http
      .get<any>(
        'https://api.edamam.com/api/recipes/v2/' +
          index +
          '?type=public&app_id=9bb52f29&app_key=%20c1334239f8df865c87bfa0f1d7bf3429%09',
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
            recipeData.totalTime // Burada Recipe modeline uygun bir şekilde ingredients dizisini oluşturmanız gerekiyor
          );
        })
      );
  }
}
