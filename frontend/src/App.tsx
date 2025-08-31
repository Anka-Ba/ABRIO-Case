import "./App.css";
import { Filter } from "./components/Filter/Filter";
import { FilterProvider } from "./components/Filter/FilterReducer";
import { ProductList } from "./components/ProductList/ProductList";
/* import { products } from "./data/Products"; */
import { Sort } from "./components/Sort/Sort";
import { useState } from "react";
import { useFetchProducts } from "./components/api/useFetchProducts";

function App() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // Fetch products from database
  const { productList, loading, error, fetchProductList } = useFetchProducts();

  /* if (loading) {
    return <div>Loading...</div>;
  } */

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* The FilterProvider enables all children to access the currently selected filter options
      and the dispatch function to update them */}
      <FilterProvider>
        <Filter />
        <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <ProductList
          products={productList}
          sortOrder={sortOrder}
          fetchProductList={fetchProductList}
        />
      </FilterProvider>
    </>
  );
}

export default App;
