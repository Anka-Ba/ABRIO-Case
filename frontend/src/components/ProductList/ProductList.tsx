import type { Product } from "../../types/types";
import { useFilterOptions } from "../Filter/FilterReducer";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

type ProductListProps = {
  products: Array<Product>;
};

export const ProductList = ({ products }: ProductListProps) => {
  const currentFilterCriteria = useFilterOptions();
  console.log(currentFilterCriteria);
  return (
    <div className={styles.listContainer}>
      {/* Display a product card for each product */}
      {products
        .filter(
          (product) =>
            currentFilterCriteria.colors.includes(product.color) ||
            currentFilterCriteria.colors.length === 0,
        )
        .filter(
          (product) =>
            currentFilterCriteria.categories.some((category) =>
              product.categories.includes(category),
            ) || currentFilterCriteria.categories.length === 0,
        )
        .map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
    </div>
  );
};
