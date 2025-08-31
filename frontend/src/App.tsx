import "./App.css";
import { Filter } from "./components/Filter/Filter";
import { FilterProvider } from "./components/Filter/FilterReducer";
import { ProductList } from "./components/ProductList/ProductList";
/* import { products } from "./data/Products"; */
import { Sort } from "./components/Sort/Sort";
import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import type { Product } from "./types/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function App() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const productCollection = collection(db, "Product");

  // Fetch products from Firestore on component mount
  useEffect(() => {
    const getProductList = async () => {
      try {
        /* const data = await getDocs(productCollection); */ // Order as fetched
        const data = await getDocs(query(productCollection, orderBy("title"))); // Order by title

        // Filter the product data and ids from the fetched documents (document = entry in collection)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        setProductList(filteredData as Product[]);
      } catch (err) {
        console.error("Error fetching products: ", err);
      }
    };
    getProductList();
  }, []);

  return (
    <>
      {/* The FilterProvider enables all children to access the currently selected filter options
      and the dispatch function to update them */}
      <FilterProvider>
        <Filter />
        <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <ProductList products={productList} sortOrder={sortOrder} />
        {/*  <ProductList products={products} sortOrder={sortOrder} /> */}
      </FilterProvider>
    </>
  );
}

export default App;
