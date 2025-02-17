"use client";

import ButtonForm from "@/components/Ui/button-form";
import { TeamMember } from "../types";
import Image from "next/image";
import { useState } from "react";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import toast from "react-hot-toast";

interface TeamListProps {
  members: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string, imageUrl: string) => Promise<void>;
}

export function TeamList({ members = [], onEdit, onDelete }: TeamListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  const handleDelete = (member: TeamMember) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;

    try {
      setDeletingId(memberToDelete.id);
      await onDelete(memberToDelete.id, memberToDelete.imageUrl || "");
      setShowDeleteModal(false);
      toast.success("Membro excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Erro ao excluir membro do time");
    } finally {
      setDeletingId(null);
      setMemberToDelete(null);
    }
  };

  if (!members || members.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum membro encontrado
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="relative bg-amber-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="relative h-40 w-full mb-4">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-background">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-02">{member.role}</p>
                <div>
                  {member.bio && (
                    <p className="mt-2 text-sm text-gray-02 line-clamp-2">
                      {member.bio}
                    </p>
                  )}
                </div>
                {/* Sociais */}
                <div className="flex flex-col gap-1 mt-1">
                  <div>
                    {member.instagram && (
                      <a
                        href={`https://instagram.com/${member.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-sm text-gray-02"
                      >
                        <p>
                          Instagram:{" "}
                          <span className="text-amber-600 hover:text-amber-700">
                            @{member.instagram.split("/").pop()}
                          </span>
                        </p>
                      </a>
                    )}
                  </div>
                  <div>
                    {member.facebook && (
                      <a
                        href={`https://facebook.com/${member.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-sm text-gray-02"
                      >
                        <p>
                          Facebook:{" "}
                          <span className="text-amber-600 hover:text-amber-700">
                            {member.facebook.split("/").pop()}
                          </span>
                        </p>
                      </a>
                    )}
                  </div>
                  <div>
                    {member.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-sm text-gray-02"
                      >
                        <p>
                          LinkedIn:{" "}
                          <span className="text-amber-600 hover:text-amber-700">
                            {member.linkedin.split("/").pop()}
                          </span>
                        </p>
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <ButtonForm
                onClick={() => onEdit(member)}
                variant="secondary_card"
              >
                Editar
              </ButtonForm>
              <ButtonForm
                onClick={() => handleDelete(member)}
                disabled={deletingId === member.id}
                variant="danger_card"
              >
                {deletingId === member.id ? "Excluindo..." : "Excluir"}
              </ButtonForm>
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Membro"
        message={`Tem certeza que deseja excluir o Membro do Time ${memberToDelete?.name}? Esta ação não pode ser desfeita.`}
        isLoading={!!deletingId}
      />
    </>
  );
}
