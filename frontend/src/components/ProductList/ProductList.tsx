import type { Product } from "../../types/types";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

type ProductListProps = {
  products: Array<Product>;
};

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className={styles.listContainer}>
      {/* Display a product card for each product */}
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
