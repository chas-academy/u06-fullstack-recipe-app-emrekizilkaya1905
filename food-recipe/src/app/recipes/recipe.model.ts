import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: string;
  public label: string;
  public dishType: string[];
  public ingredients: Ingredient[];
  public image: { url: string; width: number; height: number };
  public mealType: string[];
  public totalTime: number;

  constructor(
    id: string,
    label: string,
    dishType: string[],
    ingredients: Ingredient[],
    image: { url: string; width: number; height: number },
    mealType: string[],
    totalTime: number
  ) {
    this.id = id;
    this.label = label;
    this.dishType = dishType;
    this.ingredients = ingredients;
    this.image = image;
    this.mealType = mealType;
    this.totalTime = totalTime;
  }
}
