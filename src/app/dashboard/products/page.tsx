import { prisma } from "@/lib/prisma";
import { ProductManager } from "./components/ProductManager";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <ProductManager
        initialProducts={products.map((product) => ({
          ...product,
          price: Number(product.price),
        }))}
      />
    </div>
  );
}
