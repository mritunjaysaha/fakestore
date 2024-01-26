import { useEffect, useState } from "react";
import "./App.css";
import { ProductForm } from "./components/ProductForm/ProductForm";
import { ProductList } from "./components/ProductList/ProductList";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { Product } from "./types/product";

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [showProductForm, setShowProductForm] = useState<boolean>(false);

    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const getProducts = async () => {
        const res = await fetch("https://fakestoreapi.com/products");

        const parsedRes = await res.json();

        console.log({ parsedRes });

        setProducts(parsedRes);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleAddProductClick = () => {
        setShowProductForm(true);
    };

    const updateProductState = (data: Product) => {
        setProducts((prev) => [data, ...prev]);
        setShowProductForm(false);
    };

    const removeFromProductList = (deleteIndex: number) => {
        setProducts((prev) => {
            const filteredProducts = prev.filter(
                (_, index) => index !== deleteIndex
            );

            return filteredProducts;
        });
    };

    const search = (searchText: string) => {
        console.log({ searchText });
        products.forEach((product) => {
            const { title, description } = product;
            if (
                title.includes(searchText) ||
                description.includes(searchText)
            ) {
                console.log({ product });
                setSearchResults((prev) => [...prev, product]);
            }
        });
    };

    const resetSearch = () => {
        setSearchResults([]);
    };

    return (
        <section className="app">
            <SearchForm search={search} resetSearch={resetSearch} />

            {searchResults.length > 0 && (
                <ProductList
                    products={searchResults}
                    removeFromProductList={removeFromProductList}
                />
            )}

            <button onClick={handleAddProductClick} className="add-product">
                Add a product
            </button>

            {showProductForm && (
                <ProductForm updateProductState={updateProductState} />
            )}

            <ProductList
                products={products}
                removeFromProductList={removeFromProductList}
            />
        </section>
    );
}

export default App;
