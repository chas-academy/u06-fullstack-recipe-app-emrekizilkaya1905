import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrl: './advice.component.css',
  providers: [RecipeService],
})
export class AdviceComponent implements OnInit {
  randomRecipe: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.showRandomRecipe();
  }
  showRandomRecipe() {
    this.randomRecipe = this.recipeService.getRandomRecipe();
  }
}
