import { listProducts } from "@/api/products";
import React from "react";
import ProductListItem from "./ProductListItem";

const ProductsPage = async () => {
  const products = await listProducts();
  console.log(products);

  return (
    <div className="flex flex-wrap gap-4 max-w-[1400px] mx-auto w-full">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
