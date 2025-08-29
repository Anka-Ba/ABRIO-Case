export type Product = {
  id: number;
  imageUrl: string;
  title: string;
  stockNumber: number;
  price: number;
  color: "ROT" | "BLAU" | "GRÜN";
  categories: Array<"A" | "B" | "C">;
};
