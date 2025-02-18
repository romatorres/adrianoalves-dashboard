import { getProducts } from "@/lib/fetchers";
import { ProductManager } from "./components/ProductManager";

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <ProductManager initialProducts={products} />
    </div>
  );
}
