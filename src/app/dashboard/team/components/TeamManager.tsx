"use client";

// Mover todo o código client (estados, handlers) para este componente
import { useState } from "react";
import { TeamForm } from "./TeamForm";
import { TeamList } from "./TeamList";
import { TeamMember, TeamMemberFormData } from "../types";
import {
  createTeamMember,
  deleteTeamMember,
  updateTeamMember,
} from "../actions";
import ButtonForm from "@/components/ui/ButtonForm";
import toast from "react-hot-toast";

interface TeamManagerProps {
  initialMembers: TeamMember[];
}

export function TeamManager({ initialMembers }: TeamManagerProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: TeamMemberFormData) => {
    setIsLoading(true);
    try {
      if (selectedMember) {
        const updatedMember = await updateTeamMember(selectedMember.id, data);
        setMembers(
          members.map((m) => (m.id === selectedMember.id ? updatedMember : m))
        );
        toast.success("Membro atualizado com sucesso!");
      } else {
        const newMember = await createTeamMember(data);
        setMembers([...members, newMember]);
        toast.success("Membro adicionado com sucesso!");
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving team member:", error);
      toast.error("Erro ao salvar membro da equipe");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("team-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      await deleteTeamMember(id, imageUrl);
      setMembers(members.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Erro ao remover membro do time");
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedMember(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-background">Gerenciar Equipe</h1>
        <ButtonForm onClick={() => setShowForm(true)} variant="primary">
          Adicionar Membro
        </ButtonForm>
      </div>

      {showForm ? (
        <div id="team-form" className="mb-8 bg-amber-100 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedMember ? "Editar Membro" : "Novo Membro"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-background hover:text-gray-02"
            >
              ✕
            </button>
          </div>
          <TeamForm
            member={selectedMember || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onCancel={handleCloseForm}
          />
        </div>
      ) : null}

      <TeamList members={members} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
