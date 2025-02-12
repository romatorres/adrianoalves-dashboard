import { prisma } from "@/lib/prisma";
import { ProductManager } from "./components/ProductManager";
import { Decimal } from "@prisma/client/runtime/library";

// Função para serializar os dados
function serializeProduct(product: {
  price: Decimal;
  [key: string]: Decimal | string | boolean | Date | number | null;
}) {
  return {
    ...product,
    price: Number(product.price),
  };
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        productCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.productCategory.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    }),
  ]);

  // Serializa os produtos antes de passar para o componente cliente
  const serializedProducts = products.map(serializeProduct);

  return (
    <ProductManager
      initialProducts={serializedProducts}
      categories={categories}
    />
  );
}
