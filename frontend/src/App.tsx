import "./App.css";
import { Filter } from "./components/Filter/Filter";
import { FilterProvider } from "./components/Filter/FilterReducer";
import { ProductList } from "./components/ProductList/ProductList";
import { products } from "./data/Products";
import { Sort } from "./components/Sort/Sort";
import { useState } from "react";

function App() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  return (
    <>
      {/* The FilterProvider enables all children to access the currently selected filter options
      and the dispatch function to update them */}
      <FilterProvider>
        <Filter />
        <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <ProductList products={products} sortOrder={sortOrder} />
      </FilterProvider>
    </>
  );
}

export default App;
