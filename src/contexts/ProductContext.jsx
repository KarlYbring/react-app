import { useEffect, useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const apiUri = 'https://localhost:7242/api/clients';
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const res = await fetch(`${apiUri}`);
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ Products, getProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
