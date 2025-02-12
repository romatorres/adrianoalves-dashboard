"use client";

import Image from "next/image";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio?: string | null;
  instagram?: string | null;
  active: boolean;
  facebook?: string | null;
  linkedin?: string | null;
}

interface TeamMemberProps {
  member: TeamMember;
}

const TeamMember = ({ member }: TeamMemberProps) => {
  return (
    <div className="w-full mx-auto relative group h-[400px] rounded-lg overflow-hidden">
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src={
            member.imageUrl.startsWith("http")
              ? member.imageUrl
              : `/uploads/team/${member.imageUrl}`
          }
          alt={member.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder-person.jpg";
          }}
        />
      </div>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Ícones de redes sociais */}
      <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
        {member.instagram && (
          <a
            href={`https://instagram.com/${member.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center bg-primary hover:bg-secondary rounded-sm shadow-md hover:shadow-lg transition-all text-background hover:-translate-y-0.5"
          >
            <FaInstagram size={18} />
          </a>
        )}
        {member.facebook && (
          <a
            href={`https://facebook.com/${member.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center bg-primary hover:bg-secondary rounded-sm shadow-md hover:shadow-lg transition-all text-background hover:-translate-y-0.5"
          >
            <FaFacebook size={18} />
          </a>
        )}
        {member.linkedin && (
          <a
            href={`https://linkedin.com/in/${member.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center bg-primary hover:bg-secondary rounded-sm shadow-md hover:shadow-lg transition-all text-background hover:-translate-y-0.5"
          >
            <FaLinkedin size={18} />
          </a>
        )}
      </div>

      {/* Informações do membro */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">{member.name}</h3>
          <p className="text-sm text-gray-200">{member.role}</p>
          {member.bio && (
            <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {member.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
