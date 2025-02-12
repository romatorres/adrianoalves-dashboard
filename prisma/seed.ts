import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash("senha123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
      active: true,
    },
  });

  console.log({ admin });

  // Criar categorias de produtos
  const categories = [
    {
      name: "Cuidados Capilares",
      description: "Produtos para cuidados com os cabelos",
    },
    {
      name: "Barba",
      description: "Produtos para cuidados com a barba",
    },
  ];

  for (const category of categories) {
    await prisma.productCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Criar produtos
  const products = [
    {
      name: "Shampoo Revitalizante",
      description: "Shampoo para cabelos danificados",
      price: 45.9,
      imageUrl: "/images/shampoo.jpg",
      stock: 10,
      categoryId: (
        await prisma.productCategory.findFirst({
          where: { name: "Cuidados Capilares" },
        })
      )?.id,
    },
    {
      name: "Óleo para Barba",
      description: "Óleo hidratante para barba",
      price: 32.5,
      imageUrl: "/images/beard-oil.jpg",
      stock: 15,
      categoryId: (
        await prisma.productCategory.findFirst({
          where: { name: "Barba" },
        })
      )?.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }

  // Criar imagens da galeria
  const galleryImages = [
    {
      title: "Corte Clássico",
      imageUrl: "/images/gallery1.jpg",
      description: "Corte de cabelo clássico",
    },
    {
      title: "Barba Estilo Vintage",
      imageUrl: "/images/gallery2.jpg",
      description: "Estilo de barba vintage",
    },
    {
      title: "Corte Moderno",
      description: "Tendências em cortes masculinos",
      imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
      active: true,
      featured: true,
    },
    {
      title: "Barba Estilizada",
      description: "Especialidade em barbas",
      imageUrl: "https://images.unsplash.com/photo-1521322714240-ee1d383eab62",
      active: true,
      featured: false,
    },
  ];

  for (const image of galleryImages) {
    await prisma.galleryImage.upsert({
      where: { title: image.title },
      update: {},
      create: image,
    });
  }

  // Criar promoções
  const promotions = [
    {
      title: "Promoção de Verão",
      description: "Descontos especiais para o verão",
      imageUrl: "/images/summer-sale.jpg",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
      discount: 0.2,
    },
  ];

  for (const promotion of promotions) {
    await prisma.promotion.upsert({
      where: { title: promotion.title },
      update: {},
      create: promotion,
    });
  }

  // Criar membros da equipe
  const teamMembers = [
    {
      name: "João Silva",
      role: "Barbeiro",
      bio: "Especialista em cortes clássicos",
      imageUrl: "/images/joao.jpg",
    },
    {
      name: "Maria Souza",
      role: "Esteticista",
      bio: "Especialista em cuidados com a barba",
      imageUrl: "/images/maria.jpg",
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { name: member.name },
      update: {},
      create: member,
    });
  }

  // Criar seções
  const sections = [
    { name: "gallery", active: true },
    { name: "products", active: true },
    { name: "promotions", active: true },
    { name: "services", active: true },
    { name: "team", active: true },
  ];

  for (const section of sections) {
    await prisma.sectionVisibility.upsert({
      where: { name: section.name },
      update: {},
      create: section,
    });
  }

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
