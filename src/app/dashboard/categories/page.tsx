import { prisma } from "@/lib/prisma";
import { CategoryManager } from "./components/CategoryManager";

export default async function CategoriesPage() {
  const categories = await prisma.productCategory.findMany({
    orderBy: { name: "asc" },
  });

  return <CategoryManager initialCategories={categories} />;
}
