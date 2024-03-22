export class Recipe {
  public id: string;
  public label: string;
  public dishType: string[];
  public ingredients: string[];
  public image: { url: string; width: number; height: number };
  public mealType: string[];
  public dietLabels: string[];
  public cautions: string[];

  constructor(
    id: string,
    label: string,
    dishType: string[],
    ingredients: string[],
    image: { url: string; width: number; height: number },
    mealType: string[],
    dietLabels: string[],
    cautions: string[]
  ) {
    this.id = id;
    this.label = label;
    this.dishType = dishType;
    this.ingredients = ingredients;
    this.image = image;
    this.mealType = mealType;
    this.dietLabels = dietLabels;
    this.cautions = cautions;
  }
}
