import { ChangeEvent, FC, FormEvent, useState } from "react";
import { AddProduct, Product } from "../../types/product";

type ProductFormProps = {
    updateProductState: (data: Product) => void;
};

export const ProductForm: FC<ProductFormProps> = ({ updateProductState }) => {
    const [productForm, setProductForm] = useState<AddProduct>({
        category: "",
        description: "",
        image: "",
        price: 0,
        title: "",
    });

    const resetProductForm = () => {
        setProductForm({
            category: "",
            description: "",
            image: "",
            price: 0,
            title: "",
        });
    };

    const addProduct = async (data: AddProduct) => {
        const res = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify(data),
        });

        const parsedRes = await res.json();

        const newData: Product = {
            ...data,
            id: parsedRes.id,
            rating: { count: 0, rate: 0 },
        };

        return newData;
        // if (parsedRes?.id) {
        //     setProducts((prev) => [parsedRes, ...prev]);
        // }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        const { value, id } = target;

        setProductForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await addProduct(productForm);

        if (res?.id) {
            updateProductState(res);
            resetProductForm();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="title"
                onChange={handleChange}
                value={productForm.title}
                placeholder="Title"
            />
            <input
                id="description"
                onChange={handleChange}
                value={productForm.description}
                placeholder="Description"
            />
            <input
                id="image"
                onChange={handleChange}
                value={productForm.image}
                placeholder="Image"
            />
            <input
                id="price"
                onChange={handleChange}
                value={productForm.price}
                placeholder="Rs. "
            />
            <input
                id="category"
                onChange={handleChange}
                value={productForm.category}
                placeholder="Category"
            />

            <button>Submit</button>
        </form>
    );
};
