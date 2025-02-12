import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "Nenhuma imagem enviada" },
        { status: 400 }
      );
    }

    // Criar nome único para o arquivo
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${session.user.id}-${Date.now()}${path.extname(file.name)}`;
    
    // Configurar diretório de upload
    const uploadDir = path.resolve(process.env.UPLOAD_DIR || "./public/uploads");
    
    // Criar diretório se não existir
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Ignora erro se o diretório já existir
    }
    
    // Caminho completo do arquivo
    const filePath = path.join(uploadDir, filename);
    
    // Salvar arquivo
    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      console.error("Erro ao salvar arquivo:", error);
      return NextResponse.json(
        { error: "Erro ao salvar arquivo" },
        { status: 500 }
      );
    }
    
    // URL pública do arquivo
    const imageUrl = `/uploads/${filename}`;
    
    // Atualizar banco de dados
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Erro ao processar upload" },
      { status: 500 }
    );
  }
} 