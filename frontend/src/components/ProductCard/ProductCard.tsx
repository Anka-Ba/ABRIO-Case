import type { Product } from "../../types/types";
import styles from "./ProductCard.module.css";
import PlaceholderImage from "../../assets/images/placeholder-image.jpg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
type ProductCardProps = {
  product: Product;
  fetchProductList: () => Promise<void>;
};

export const ProductCard = ({
  product,
  fetchProductList,
}: ProductCardProps) => {
  /**
   * Increases the quantity in the shopping cart by one
   * Updates the database
   * Refetches the updated products
   * @param id of the product to be updated
   */
  const addToCart = async (id: string) => {
    const productDoc = doc(db, "Product", id);
    await updateDoc(productDoc, { cartQuantity: product.cartQuantity + 1 });
    fetchProductList();
    console.log(
      `Product with id ${id} was added to the cart, Quantity in cart: ${product.cartQuantity}`,
    );
  };

  return (
    <>
      <div className={styles.productCard}>
        {/*  Product image, show placeholder if no image available*/}
        <img src={product.imageUrl || PlaceholderImage} alt="Produktfoto" />
        {/* Product information */}
        <h2>{product.title}</h2>
        <p>Anzahl {product.stockNumber}</p>
        <p>{product.price} €</p>
        {/* Button to add product to cart, disabled if available amount was added to cart */}
        <button
          disabled={product.cartQuantity >= product.stockNumber}
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};
