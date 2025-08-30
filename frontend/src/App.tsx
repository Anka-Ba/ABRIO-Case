import "./App.css";
import { Filter } from "./components/Filter/Filter";
import { FilterProvider } from "./components/Filter/FilterReducer";
import { ProductList } from "./components/ProductList/ProductList";
import { products } from "./data/Products";
import { Sort } from "./components/Sort/Sort";

function App() {
  return (
    <>
      {/* The FilterProvider enables all children to access the currently selected filter options
      and the dispatch function to update them */}
      <FilterProvider>
        <Filter />
        <Sort />
        <ProductList products={products} />
      </FilterProvider>
    </>
  );
}

export default App;
