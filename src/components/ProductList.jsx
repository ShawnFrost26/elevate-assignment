import React, { useEffect, useState } from "react";
import Product from "./Product";
import "./ProductList.css";

const ProductList = ({ selectedCategory, searchKeyword }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredByCategory =
      selectedCategory === "All category"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    const filteredByKeyword = filteredByCategory.filter((product) => {
      return product.title.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    setFilteredProducts(filteredByKeyword);
  }, [selectedCategory, searchKeyword, products]);

  return (
    <>
      {loading ? <h1 className="not-found">Loading...</h1> : null}

    
    <div className="product-list">
      {filteredProducts.length ? (
        filteredProducts.map((product) => (
          <Product
            key={product.id}
            name={product.title}
            price={product.price}
            imageUrl={product.image}
          />
        ))
      ) : (
        <h1 className="not-found">No products found</h1>
      )}

      {}
    </div>
    </>
  );
};

export default ProductList;
