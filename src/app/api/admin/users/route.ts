import { validateAdminAccess } from "@/lib/auth/permissions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await validateAdminAccess();

    // Resto do código...
  } catch {
    return NextResponse.json(
      { error: "Acesso não autorizado" },
      { status: 403 }
    );
  }
}
