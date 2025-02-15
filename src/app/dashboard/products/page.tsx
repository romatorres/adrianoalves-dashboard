import { prisma } from "@/lib/prisma";
import { ProductManager } from "./components/ProductManager";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: {
      productCategory: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  const categories = await prisma.productCategory.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
      description: true,
      active: true,
    },
  });

  const formattedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return (
    <div>
      <ProductManager
        initialProducts={formattedProducts}
        categories={categories}
      />
    </div>
  );
}
