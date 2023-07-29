import React, { useEffect, useState } from "react";
import "./Header.css";
import { SearchOutlined } from "@ant-design/icons";
import ProductList from "./ProductList";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All category");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        // console.log("categoriesdata:", data)
        const allCategories = ["All category", ...data];
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <header className="header">
      <div className="inner-header">
         <div>
        <h1>STOREREX</h1>
      </div>

      <div className="action-bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <button className="search-button">
            <SearchOutlined />
          </button>
        </div>
        <select className="category-dropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      </div>
     
      <ProductList selectedCategory={selectedCategory} searchKeyword={searchKeyword} />

    </header>
  );
};

export default Header;
