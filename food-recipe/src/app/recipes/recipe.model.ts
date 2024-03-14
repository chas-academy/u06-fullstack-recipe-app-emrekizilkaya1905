import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public mealType: string;
  public allergens: string[];
  public dietaryRequirements: string[];

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    ingredients: Ingredient[],
    mealType: string,
    allergens: string[],
    dietaryRequirements: string[]
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.mealType = mealType;
    this.allergens = allergens;
    this.dietaryRequirements = dietaryRequirements;
  }
}
