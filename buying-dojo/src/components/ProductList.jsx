import React from "react";
import ProductCard from "./ProductCard";
import { formatCategory } from "../utils/formatCategory";
import "./ProductList.css";

export default function ProductList({ products }) {
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <section className="product-list page-shell">
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="category-section">
          <div className="category-header">
            <h2 className="category-title">{formatCategory(category)}</h2>
            <div className="category-divider" />
          </div>

          <div className="category-products">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
