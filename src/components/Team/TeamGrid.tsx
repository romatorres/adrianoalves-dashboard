"use client";

import TeamMember, { TeamMember as TeamMemberType } from "./TeamCard";
import Image from "next/image";

interface TeamGridProps {
  members: TeamMemberType[];
  isVisible?: boolean;
}

const TeamGrid = ({ members, isVisible = true }: TeamGridProps) => {
  if (!isVisible) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-20 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl font-primary font-normal text-black_secondary mb-3">
            Nosso Time
          </h2>
          <div className="relative w-[96px] h-[22px] md:w-[120px] md:h-[28px]">
            <Image
              src="/img/bigode.svg"
              alt="Bigode abaixo do titulo Serviços"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <p className="text-lg md:text-xl text-background font-tertiary md:font-semibold font-medium text-center max-w-2xl mx-auto mb-8 md:mb-20">
          Conheça nossa equipe de profissionais altamente qualificados, prontos
          para oferecer o melhor em serviços de barbearia, manicure e salão de
          beleza, unisex.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members
            .filter((member) => member.active)
            .map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:space-x-6 mt-16">
          <a
            href="https://avec.app/adrianoalves/"
            target="_blank"
            className="w-full sm:w-auto bg-background text-secondary px-12 py-4 rounded-full font-semibold text-center hover:bg-primary hover:text-background transition-colors duration-300"
          >
            AGENDE UM HORÁRIO
          </a>
          <a
            href="#service"
            className="border-2 border-black_secondary text-black_secondary px-12 py-4 rounded-full font-semibold text-center hover:bg-background hover:text-white transition-colors duration-300"
          >
            NOSSOS SERVIÇOS
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
