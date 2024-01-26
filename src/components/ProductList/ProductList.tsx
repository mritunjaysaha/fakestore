import { FC, MouseEventHandler } from "react";
import { Product } from "../../types/product";
import styles from "./productList.module.css";

type ProductListProps = {
    products: Product[];
    removeFromProductList: (index: number) => void;
};

export const ProductList: FC<ProductListProps> = ({
    products,
    removeFromProductList,
}) => {
    const deleteProduct = async (data: Product) => {
        const res = await fetch(
            `https://fakestoreapi.com/products/${data.id}`,
            {
                method: "DELETE",
            }
        );

        const parsedRes = await res.json();

        return parsedRes;
    };

    const handleDeleteClick: MouseEventHandler = async (e) => {
        const target = e.target as HTMLElement;

        const button = target.closest(
            "button[data-delete-product-index]"
        ) as HTMLElement;

        if (button?.dataset?.deleteProductIndex) {
            const productIndex = Number(button.dataset.deleteProductIndex);
            const product = products[productIndex];
            const res = await deleteProduct(product);

            if (res?.id) {
                removeFromProductList(productIndex);
            }
        }
    };

    return (
        <div onClick={handleDeleteClick} className={styles.list_container}>
            {products.map(({ id, title, description, price, image }, index) => (
                <div key={id} className={styles.product}>
                    <img src={image} alt={title} width={400} height={400} />

                    <div>
                        <p>{title}</p>
                        <p>{description}</p>
                        <p>{price}</p>
                    </div>
                    <button data-delete-product-index={index}>Delete</button>
                </div>
            ))}
        </div>
    );
};
