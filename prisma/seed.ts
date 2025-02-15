import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const sections = [
    { name: 'gallery', active: true },
    { name: 'products', active: true },
    { name: 'promotions', active: true },
    { name: 'services', active: true },
    { name: 'team', active: true },
  ]

  console.log('Seeding sections...');

  for (const section of sections) {
    await prisma.sectionVisibility.upsert({
      where: { name: section.name },
      update: {},
      create: {
        name: section.name,
        active: section.active,
      }
    })
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error('Error in seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
