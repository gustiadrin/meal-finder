export type Category = {
  strCategory: string;
};

export type CategoriesResponse = {
  meals: Category[];
};

export type Meals = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};
