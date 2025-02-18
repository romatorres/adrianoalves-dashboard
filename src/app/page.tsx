import { ProductGrid } from "@/components/Shop/ProductGrid";
import TeamGrid from "@/components/Team/TeamGrid";
import { PromotionGrid } from "@/components/Promotions/PromotionGrid";
import { Hero } from "@/components/Hero/Hero";
import { Header } from "@/components/Header/Header";
import { GalleryGrid } from "@/components/Gallery/GalleryGrid";
import { ServiceGrid } from "@/components/Services/ServiceGrid";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

import {
  getProducts,
  getServices,
  getGalleryImages,
  getTeamMembers,
  getPromotions,
} from "@/lib/fetchers";

import { About } from "@/components/About/About";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function Home() {
  const sections = await prisma.sectionVisibility.findMany();
  const sectionsMap = sections.reduce((acc, section) => {
    acc[section.name] = section.active;
    return acc;
  }, {} as Record<string, boolean>);

  const [images, products, members, promotions, services] = await Promise.all([
    getGalleryImages(),
    getProducts(),
    getTeamMembers(),
    getPromotions(),
    getServices(),
  ]);

  return (
    <main>
      <section id="home">
        <Header />
      </section>
      <Hero />
      <section id="promotions">
        <PromotionGrid
          promotions={promotions}
          isVisible={sectionsMap.promotions}
        />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="shop">
        <ProductGrid products={products} isVisible={sectionsMap.products} />
      </section>
      <section id="team">
        <TeamGrid members={members} isVisible={sectionsMap.team} />
      </section>
      <section id="service">
        <ServiceGrid services={services} isVisible={sectionsMap.services} />
      </section>
      <section id="gallery">
        <GalleryGrid images={images} isVisible={sectionsMap.gallery} />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
