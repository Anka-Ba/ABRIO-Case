import { useEffect, useState } from "react";
import type { Product } from "../../types/types";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const useFetchProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productList, setProductList] = useState<Product[]>([]);
  const productCollection = collection(db, "Product");

  /**
   * Fetches the products list from the database
   * Can be used to refetch data
   */
  const fetchProductList = async () => {
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

  useEffect(() => {
    fetchProductList();
  }, []);

  /**
   * Sets fieldName to value for all products
   * Using a batch ensures that all fields are updated at once
   * @param fieldName
   * @param value
   */
  const updateFields = async (fieldName: string, value: number | string) => {
    try {
      const productCollection = collection(db, "Product");
      const snapshot = await getDocs(productCollection);

      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => {
        batch.update(doc(db, "Product", d.id), { [fieldName]: value });
      });

      await batch.commit();
    } catch (err) {
      console.error("Error updating products: ", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return { productList, loading, error, fetchProductList, updateFields };
};
