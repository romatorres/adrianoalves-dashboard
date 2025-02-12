"use client";

import { LoginForm } from "@/components/Auth/LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-xl w-full p-8 mx-3 bg-white shadow-md rounded-lg">
        <div className="flex flex-col justify-center items-center gap-10">
          <div>
            <Image
              src="/img/logo.png"
              alt="Logo Barbearia"
              width={200}
              height={50}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-center mb-10">Login</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
