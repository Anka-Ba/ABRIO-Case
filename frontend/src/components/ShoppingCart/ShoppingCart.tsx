import type { Product } from "../../types/types";
import styles from "./ShoppingCart.module.css";

type ShoppingCartProps = {
  products: Product[];
  fetchProductList: () => Promise<void>;
  updateFields: (fieldName: string, value: string | number) => Promise<void>;
  updateSingleField: (
    fieldName: string,
    value: string | number,
    id: string,
  ) => Promise<void>;
};

/**
 * Shows title and quantity for all products in the shopping cart
 * Displays the summed up price
 */
export const ShoppingCart = ({
  products,
  fetchProductList,
  updateFields,
  /* updateSingleField, */
}: ShoppingCartProps) => {
  // Calculate the total price with two decimals
  const totalPrice = products
    .reduce((sum, product) => {
      return sum + product.price * product.cartQuantity;
    }, 0)
    .toFixed(2);

  /**
   * Clears the cart by resetting stockNumber and setting cartQuantity to 0 for all products
   */
  const clearCart = () => {
    updateFields("cartQuantity", 0);
    /*  products.forEach((product) => {
      updateSingleField(
        "stockNumber",
        product.stockNumber + product.cartQuantity,
        product.id,
      );
    }); */
    fetchProductList();
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.listContainer}>
        {/*  Products and amount added to the cart */}
        <h2>Warenkorb</h2>
        {products.map((product) => {
          return (
            product.cartQuantity > 0 && (
              <div key={product.id}>
                {product.title} × {product.cartQuantity}
              </div>
            )
          );
        })}
      </div>
      {/* Calculated total price of all products in the cart */}
      <div className={styles.sumContainer}>
        <h3>Summe</h3>
        {totalPrice} €
        <div>
          {/* Button to clear the cart appears when cart is not empty, i.e. the price is greater than 0*/}
          {Number(totalPrice) > 0 && (
            <button
              className={styles.clearCartButton}
              onClick={() => clearCart()}
            >
              Warenkorb leeren
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
