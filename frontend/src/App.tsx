import { Filter } from "./components/Filter/Filter";
import { FilterProvider } from "./components/Filter/FilterReducer";
import { ProductList } from "./components/ProductList/ProductList";
/* import { products } from "./data/Products"; */
import { Sort } from "./components/Sort/Sort";
import { useState } from "react";
import { useFetchProducts } from "./components/api/useFetchProducts";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";
import styles from "./App.module.css";

function App() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // Fetch products from database
  const {
    productList,
    error,
    fetchProductList,
    updateFields,
    updateSingleField,
  } = useFetchProducts();

  // Show error if error occured fetching the products
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* The FilterProvider enables all children to access the currently selected filter options
      and the dispatch function to update them */}
      <FilterProvider>
        <div className={styles.sortAndFilter}>
          {/* Filter and sort functionality */}
          <Filter />
          <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
        {/* List of products */}
        <ProductList
          products={productList}
          sortOrder={sortOrder}
          fetchProductList={fetchProductList}
          updateSingleField={updateSingleField}
        />
        {/* Products added to the shopping cart */}
        <ShoppingCart
          products={productList}
          fetchProductList={fetchProductList}
          updateFields={updateFields}
          updateSingleField={updateSingleField}
        />
      </FilterProvider>
    </>
  );
}

export default App;
