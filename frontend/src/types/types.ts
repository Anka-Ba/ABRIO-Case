export type Color = "Rot" | "Blau" | "Grün";
export type Category = "A" | "B" | "C";
export type FilterOptions = Color | Category;
export type FilterName = "Farbe" | "Kategorie";

export type Product = {
  id: string;
  imageUrl: string;
  title: string;
  stockNumber: number;
  price: number;
  color: Color;
  categories: Array<Category>;
  cartQuantity: number;
};

/* All filter options currently chosen by the user */
export type ActiveFilterOptions = {
  colors: Array<Color>;
  categories: Array<Category>;
};

export type FilterActionType =
  | "ADD_FILTER_OPTION"
  | "REMOVE_FILTER_OPTION"
  | "CLEAR_ALL";

export type FilterAction = {
  type: FilterActionType;
  payload?: { type: FilterName; data: Color | Category };
};
