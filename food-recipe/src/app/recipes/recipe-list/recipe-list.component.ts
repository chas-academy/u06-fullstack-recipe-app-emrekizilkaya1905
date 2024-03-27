import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  randomRecipes = 'adana';

  searchquery = '';

  mealType = '';

  dishType = '';

  diet = '';

  cuisineType = '';

  allRecipes: any;

  breakfast = 'Breakfast';
  lunch = 'Lunch';
  dinner = 'Dinner';
  snack = 'Snack';
  teatime = 'Teatime';

  biscuitsAndCookies = 'Biscuits and cookies';
  bread = 'Bread';
  cereals = 'Cereals';
  condimentsAndSauces = 'Condiments and sauces';
  desserts = 'Desserts';
  drinks = 'Drinks';
  mainCourse = 'Main course';
  pancake = 'Pancake';
  preps = 'Preps';
  preserve = 'Preserve';
  salad = 'Salad';
  sandwiches = 'Sandwiches';
  sideDish = 'Side dish';
  soup = 'Soup';
  starter = 'Starter';
  sweets = 'Sweets';

  balanced = 'balanced';
  highFiber = 'high-fiber';
  highProtein = 'high-protein';
  lowCarb = 'low-carb';
  lowFat = 'low-fat';
  lowSodium = 'low-sodium';

  american = 'american';
  asian = 'asian';
  british = 'british';
  caribbean = 'caribbean';
  centralEurope = 'central Europe';
  chinese = 'chinese';
  easternEurope = 'eastern Europe';
  french = 'french';
  indian = 'indian';
  italian = 'italian';
  japanese = 'japanese';
  kosher = 'kosher';
  mediterranean = 'mediterranean';
  mexican = 'mexican';
  middleEastern = 'middle Eastern';
  nordic = 'nordic';
  southAmerican = 'south American';
  southEastAsian = 'south East Asian';

  constructor(
    private recipeService: RecipeService,

    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipeService
      .getRecipes(this.randomRecipes, '', '', '', '')
      .subscribe((result: any) => {
        console.log('Result from API:', result); // API'den gelen veriyi konsola yazdır
        let recipes = result.hits.map((data: any) => {
          let recipe = data.recipe;
          recipe.selfref = data._links.self.href;
          return recipe;
        });
        this.allRecipes = recipes;
        console.log('Emre', this.allRecipes);
      });
  }
  getRecipex() {
    this.recipeService
      .getRecipes(
        this.searchquery,
        this.mealType,
        this.dishType,
        this.diet,
        this.cuisineType
      )
      .subscribe((result: any) => {
        console.log('Result from APIx:', result); // API'den dönen veriyi konsola yazdır
        let recipes = result.hits.map((data: any) => {
          let recipe = data.recipe;
          recipe.selfref = data._links.self.href;
          return recipe;
        });
        this.allRecipes = recipes;
      });
  }

  splitRecipeIdFromUri(uri: string | undefined): string {
    // console.log('URI:', uri); // URI'yi konsola yazdır
    if (!uri) return '';

    const parts = uri.split('_');
    return parts[parts.length - 1] || '';
  }
}
