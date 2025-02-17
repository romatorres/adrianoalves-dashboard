"use client";

import ButtonForm from "@/components/Ui/button-form";
import { User } from "../types";
import { useState } from "react";
import { DeleteModal } from "@/components/Modal/DeleteModal";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => Promise<void>;
}

export function UserList({ users = [], onEdit, onDelete }: UserListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setDeletingId(userToDelete.id);
    try {
      await onDelete(userToDelete.id);
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum usuário encontrado
      </div>
    );
  }

  return (
    <>
      <div className="bg-amber-100 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-background truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-02">{user.email}</p>
                    <div className="flex items-center gap-6 mt-1">
                      <span className="text-sm text-gray-02">{user.role}</span>
                      <span
                        className={`px-2 inline-flex items-start text-xs leading-5 font-semibold rounded-full ${
                          user.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <ButtonForm
                      onClick={() => onEdit(user)}
                      variant="secondary_card"
                    >
                      Editar
                    </ButtonForm>
                    <ButtonForm
                      onClick={() => handleDeleteClick(user)}
                      variant="danger_card"
                      disabled={deletingId === user.id}
                    >
                      {deletingId === user.id ? "Excluindo..." : "Excluir"}
                    </ButtonForm>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Usuário"
        message={`Tem certeza que deseja excluir o usuário ${userToDelete?.name}? Esta ação não pode ser desfeita.`}
        isLoading={!!deletingId}
      />
    </>
  );
}
