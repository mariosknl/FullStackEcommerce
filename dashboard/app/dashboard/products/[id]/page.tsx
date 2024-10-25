import { fetchProductById } from "@/api/products";
import React from "react";
import ProductListItem from "../ProductListItem";

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await fetchProductById(Number(id));
  return (
    <div className="max-w-[1200px] mx-auto w-full">
      <ProductListItem product={product} />
    </div>
  );
};

export default ProductPage;
