"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import ButtonForm from "@/components/Ui/button-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Section {
  id: string;
  name: string;
  active: boolean;
}

const sectionNames = {
  gallery: "Galeria",
  products: "Produtos",
  promotions: "Promoções",
  services: "Serviços",
  team: "Equipe",
};

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      // Primeiro, tenta criar as seções iniciais
      await fetch("/api/sections", {
        method: "POST",
      });

      // Depois busca todas as seções
      const response = await fetch("/api/sections");
      const data = await response.json();

      if (Array.isArray(data)) {
        setSections(data);
      } else if (data.error) {
        console.error("Error from API:", data.error);
        setSections([]);
      } else {
        console.error("Unexpected data format:", data);
        setSections([]);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
      setSections([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (name: string, active: boolean) => {
    try {
      const response = await fetch("/api/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, active }),
      });

      if (response.ok) {
        setSections((prev) =>
          prev.map((section) =>
            section.name === name ? { ...section, active } : section
          )
        );
      }
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl text-background font-bold mb-6">
          Gerenciar Seções
        </h1>
        <ButtonForm variant="btn_icon">
          <Link href="/dashboard">
            <ChevronLeft />
          </Link>
        </ButtonForm>
      </div>
      <div className="bg-amber-100 rounded-lg shadow p-6">
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div>
                <span className="text-lg text-gray-01">
                  {sectionNames[section.name as keyof typeof sectionNames]}
                </span>
              </div>
              <div className="flex items-center gap-8">
                <span
                  className={`ml-3 text-sm px-2 py-1 rounded ${
                    section.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {section.active ? "Habilidado" : "Desabilitado"}
                </span>
                <Switch
                  checked={section.active}
                  onChange={(active) => handleToggle(section.name, active)}
                  className={`${
                    section.active ? "bg-amber-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}
                >
                  <span className="sr-only">
                    {section.active ? "Disable" : "Enable"} {section.name}
                  </span>
                  <span
                    className={`${
                      section.active ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
