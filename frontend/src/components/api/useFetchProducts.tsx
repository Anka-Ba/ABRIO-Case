import { useEffect, useState } from "react";
import type { Product } from "../../types/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase";

export const useFetchProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productList, setProductList] = useState<Product[]>([]);
  const productCollection = collection(db, "Product");

  useEffect(() => {
    const getProductList = async () => {
      setLoading(true);
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
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    getProductList();
  }, []);

  return { productList, loading, error };
};
