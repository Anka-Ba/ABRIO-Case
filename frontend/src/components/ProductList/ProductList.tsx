import type { Product } from "../../types/types";
import { ProductCard } from "../ProductCard/ProductCard";

type ProductListProps = {
  products: Array<Product>;
};

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      {/* Display a product card for each product */}
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </>
  );
};
