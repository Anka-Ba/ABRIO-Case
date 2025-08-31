import type { Product } from "../../types/types";

type ShoppingCartProps = {
  products: Product[];
  fetchProductList: () => Promise<void>;
  updateFields: (fieldName: string, value: string | number) => Promise<void>;
};

/**
 * Shows title and quantity for all products in the shopping cart
 * Displays the summed up price
 */
export const ShoppingCart = ({
  products,
  fetchProductList,
  updateFields,
}: ShoppingCartProps) => {
  // Calculate the total price with two decimals
  const totalPrice = products
    .reduce((sum, product) => {
      return sum + product.price * product.cartQuantity;
    }, 0)
    .toFixed(2);

  /**
   * Clears the cart by setting cartQuantity to 0 for all products
   */
  const clearCart = () => {
    updateFields("cartQuantity", 0);
    fetchProductList();
  };

  return (
    <>
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
      <h3>Summe</h3>
      {totalPrice} €
      <div>
        <button onClick={() => clearCart()}>Clear cart</button>
      </div>
    </>
  );
};
