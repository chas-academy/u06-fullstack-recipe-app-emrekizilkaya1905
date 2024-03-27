import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeIdX: string | null | undefined;

  allRecipes: any;

  recipe: any;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipeIdX = this.activatedRoute.snapshot.paramMap.get('id');
    this.getDataFromEdamam();
  }

  getDataFromEdamam() {
    if (this.recipeIdX === null || this.recipeIdX === undefined) {
      console.error('Recipe ID is null or undefined');
      return;
    }

    console.log('Recipe ID:', this.recipeIdX);

    this.recipeService.idGetRecipes(this.recipeIdX).subscribe((result: any) => {
      console.log('Result from API:', result); // API'den gelen veriyi konsola yazdır
      this.allRecipes = result;
      console.log(this.allRecipes);
      console.log(typeof this.allRecipes);
      if (
        !Array.isArray(this.allRecipes) &&
        typeof this.allRecipes === 'object' &&
        this.allRecipes !== null
      ) {
        this.recipe = this.allRecipes.recipe;
        console.log('Selected Recipe:', this.recipe); // Seçilen yemeği konsola yazdır
      } else {
        console.error('No recipes found in the response');
      }
    });
  }
}
