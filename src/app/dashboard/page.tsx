import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardHome() {
  const [products, services, team, gallery, promotions] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.service.count({ where: { active: true } }),
    prisma.teamMember.count({ where: { active: true } }),
    prisma.galleryImage.count(),
    prisma.promotion.count({
      where: {
        active: true,
        endDate: {
          gte: new Date(),
        },
      },
    }),
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-background">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Link href="/dashboard/products">
          <div className="bg-amber-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-01">Produtos</h2>
            <p className="text-3xl font-bold text-background mt-2">
              {products}
            </p>
          </div>
        </Link>
        <Link href="/dashboard/services">
          <div className="bg-amber-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-01">Serviços</h2>
            <p className="text-3xl font-bold text-background mt-2">
              {services}
            </p>
          </div>
        </Link>
        <Link href="/dashboard/team">
          <div className="bg-amber-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-01">Equipe</h2>
            <p className="text-3xl font-bold text-background mt-2">{team}</p>
          </div>
        </Link>
        <Link href="/dashboard/gallery">
          <div className="bg-amber-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-01">
              Fotos na Galeria
            </h2>
            <p className="text-3xl font-bold text-background mt-2">{gallery}</p>
          </div>
        </Link>
        <Link href="/dashboard/promotions">
          <div className="bg-amber-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-01">
              Promoções Ativas
            </h2>
            <p className="text-3xl font-bold text-background mt-2">
              {promotions}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
