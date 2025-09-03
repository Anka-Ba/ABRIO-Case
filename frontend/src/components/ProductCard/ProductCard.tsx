import type { Product } from "../../types/types";
import styles from "./ProductCard.module.css";
import PlaceholderImage from "../../assets/images/placeholder-image.jpg";
type ProductCardProps = {
  product: Product;
  fetchProductList: () => Promise<void>;
  updateSingleField: (
    fieldName: string,
    value: string | number,
    id: string,
  ) => Promise<void>;
};

export const ProductCard = ({
  product,
  fetchProductList,
  updateSingleField,
}: ProductCardProps) => {
  /**
   * Increases the quantity in the shopping cart by one
   * Updates the database
   * Refetches the updated products
   * @param id of the product to be updated
   */
  const addToCart = async (id: string) => {
    updateSingleField("cartQuantity", product.cartQuantity + 1, id);
    /* updateSingleField("stockNumber", product.stockNumber - 1, id); */
    fetchProductList();
    console.log(
      `Product with id ${id} was added to the cart, Quantity in cart: ${product.cartQuantity}`,
    );
  };

  return (
    <>
      <div className={styles.productCard}>
        {/*  Product image, show placeholder if no image available*/}
        <div className={styles.imageContainer}>
          <img src={product.imageUrl || PlaceholderImage} alt="Produktfoto" />
        </div>
        <div className={styles.productInfo}>
          {/* Product information: title, stock number, price */}
          <h2>{product.title}</h2>
          {/* Show stock number or sold out */}
          {product.stockNumber > 0 ? (
            <p>Noch {product.stockNumber} verfügbar</p>
          ) : (
            <p className={styles.soldOut}>Ausverkauft</p>
          )}

          <p>{product.price} €</p>
          {/* Button to add product to cart, disabled if available amount has already been added to the cart */}
          <button
            className={styles.cartButton}
            disabled={product.cartQuantity >= product.stockNumber}
            onClick={() => addToCart(product.id)}
          >
            In den Warenkorb
          </button>
        </div>
      </div>
    </>
  );
};
