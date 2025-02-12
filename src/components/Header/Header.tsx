"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { AdminButton } from "../Admin/AdminButton";
import { MobileMenu } from "./MobileMenu";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollToSection = useScrollToSection();

  // Controla o background no scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lista de links do menu
  const menuItems = [
    { href: "promotions", label: "PROMOÇÕES" },
    { href: "about", label: "SOBRE" },
    { href: "shop", label: "SHOPS" },
    { href: "team", label: "TIME" },
    { href: "service", label: "SERVIÇOS" },
    { href: "gallery", label: "GALERIA" },
    { href: "contact", label: "CONTATO" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollToSection(href);
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("home");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          hasScrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : ""
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-28 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={handleLogoClick}
            className="relative lg:w-64 md:w-60 w-40 h-16 cursor-pointer"
          >
            <Image
              src="/img/logo.png"
              alt="Logo Barbearia"
              fill
              className="object-contain"
            />
          </a>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-secondary hover:text-primary font-secondary transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <AdminButton />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-white p-2"
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
        onNavClick={handleNavClick}
      />
    </>
  );
}
