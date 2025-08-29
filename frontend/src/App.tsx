import "./App.css";
import { ProductList } from "./components/ProductList/ProductList";
import { products } from "./data/Products";

function App() {
  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default App;
