"use client";

import { X } from "lucide-react";
import { AdminButton } from "../Admin/AdminButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{ href: string; label: string }>;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  onNavClick,
}: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Menu Container */}
      <div
        className={`bg-background/95 backdrop-blur-sm fixed top-0 right-0 h-full w-[80%] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-9 right-4 text-white p-2"
          aria-label="Fechar menu"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col items-center pt-28 space-y-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={(e) => onNavClick(e, item.href)}
              className="text-white hover:text-primary transition-colors text-lg font-secondary cursor-pointer"
            >
              {item.label}
            </a>
          ))}
          <AdminButton />
        </nav>
      </div>
    </>
  );
}
