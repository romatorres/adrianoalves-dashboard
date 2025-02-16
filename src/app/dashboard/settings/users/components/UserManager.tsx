"use client";

import { useState } from "react";
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

interface UserManagerProps {
  initialUsers: User[];
}

interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: string;
  active: boolean;
}

export function UserManager({ initialUsers }: UserManagerProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: selectedUser ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          id: selectedUser?.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao salvar usuário");
      }

      const savedUser = await response.json();

      if (selectedUser) {
        setUsers(users.map((u) => (u.id === savedUser.id ? savedUser : u)));
        toast.success("Usuário atualizado com sucesso!");
      } else {
        setUsers([savedUser, ...users]);
        toast.success("Usuário criado com sucesso!");
      }

      handleCloseForm();
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao salvar usuário"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      setUsers(users.filter((user) => user.id !== id));
      toast.success("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Erro ao excluir usuário");
    }
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-background">
          Gerenciar Usuários
        </h1>
        <Button onClick={() => setShowForm(true)} variant="primary">
          Novo Usuário
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 bg-amber-100 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedUser ? "Editar Usuário" : "Novo Usuário"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      )}

      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
