import "./App.css";
import { Filter } from "./components/Filter/Filter";
import { ProductList } from "./components/ProductList/ProductList";
import { products } from "./data/Products";

function App() {
  return (
    <>
      <Filter />
      <ProductList products={products} />
    </>
  );
}

export default App;
