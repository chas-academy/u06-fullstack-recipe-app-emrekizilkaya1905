export class Recipe {
  public id: string;
  public label: string;
  public dishType: string[];
  public ingredients: string[];
  public image: { url: string; width: number; height: number };
  public mealType: string[];
  public totalTime: number;

  constructor(
    id: string,
    label: string,
    dishType: string[],
    ingredients: string[],
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
