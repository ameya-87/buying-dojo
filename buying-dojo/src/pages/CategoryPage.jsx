import React from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/Products";
import ProductCard from "../components/ProductCard";
import { formatCategory } from "../utils/formatCategory";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { category } = useParams();
  const filtered = products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <section className="category-page page-shell">
      <div className="category-page-header">
        <h1 className="category-page-title">{formatCategory(category)}</h1>
        <div className="category-page-divider" />
      </div>

      {filtered.length > 0 ? (
        <>
          <p className="category-page-count">
            {filtered.length} curated pick{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="category-page-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="category-page-empty surface-card">
          <p>No products found in this category yet.</p>
          <Link to="/">Browse all recommendations</Link>
        </div>
      )}
    </section>
  );
}
