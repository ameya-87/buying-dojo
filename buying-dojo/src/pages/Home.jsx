import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import { products } from "../data/Products";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductList products={products} />
    </>
  );
}
