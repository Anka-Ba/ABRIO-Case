import type { Product } from "../../types/types";
import styles from "./ProductCard.module.css";
import PlaceholderImage from "../../assets/images/placeholder-image.jpg";
type ProductCardProps = { product: Product };

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <div className={styles.productCard}>
        {/*  Product image, show placeholder if no image available*/}
        <img src={product.imageUrl || PlaceholderImage} alt="Produktfoto" />
        {/* Product information */}
        <h2>{product.title}</h2>
        <p>Anzahl {product.stockNumber}</p>
        <p>{product.price} €</p>
        {/* Button to add product to cart */}
        <button>Add to Cart</button>
      </div>
    </>
  );
};
