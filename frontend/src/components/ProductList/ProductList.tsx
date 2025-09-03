import type { Product } from "../../types/types";
import { useFilterOptions } from "../Filter/FilterReducer";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

type ProductListProps = {
  products: Array<Product>;
  sortOrder: "asc" | "desc" | null;
  fetchProductList: () => Promise<void>;
  updateSingleField: (
    fieldName: string,
    value: string | number,
    id: string,
  ) => Promise<void>;
};

export const ProductList = ({
  products,
  sortOrder,
  fetchProductList,
  updateSingleField,
}: ProductListProps) => {
  // Get the currently selected filter options from context
  const currentFilterCriteria = useFilterOptions();

  // Function to sort products based on price and selected sort order
  const compareByPrice = (productOne: Product, productTwo: Product) => {
    if (sortOrder === "asc") {
      return productOne.price - productTwo.price; // Ascending order
    } else if (sortOrder === "desc") {
      return productTwo.price - productOne.price; // Descending order
    } else {
      return 0; // No sorting
    }
  };

  return (
    <div className={styles.listContainer}>
      {/* Display a product card for each product */}
      {products
        // Filter by color
        .filter(
          (product) =>
            currentFilterCriteria.colors.includes(product.color) ||
            currentFilterCriteria.colors.length === 0, // Show all colors if no color is selected
        )
        // Filter by category
        // Note to self: some() checks if at least one element in the array passes the test implemented by the provided function
        .filter(
          (product) =>
            currentFilterCriteria.categories.some((category) =>
              product.categories.includes(category),
            ) || currentFilterCriteria.categories.length === 0, // Show all categories if no category is selected
        )
        // Sort products based on price and selected sort order
        .sort(compareByPrice)
        .map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            fetchProductList={fetchProductList}
            updateSingleField={updateSingleField}
          />
        ))}
    </div>
  );
};
