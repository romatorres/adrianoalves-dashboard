import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validar o email
    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Por segurança, não revelamos se o email existe ou não
    if (!user) {
      return NextResponse.json({
        message:
          "Se o email existir, você receberá as instruções de recuperação",
      });
    }

    // Gera token único
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hora

    try {
      // Salva o token no banco
      await prisma.passwordReset.create({
        data: {
          userId: user.id,
          token,
          expires,
        },
      });

      // URL de reset
      const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

      // Envia o email
      await sendEmail({
        to: email,
        subject: "Recuperação de Senha",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Recuperação de Senha</h1>
            <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #d4a853; color: white; text-decoration: none; border-radius: 5px;">
              Redefinir Senha
            </a>
            <p style="color: #666; margin-top: 20px;">Este link expira em 1 hora.</p>
            <p style="color: #999; font-size: 12px;">Se você não solicitou a recuperação de senha, ignore este email.</p>
          </div>
        `,
      });

      return NextResponse.json({
        message:
          "Se o email existir, você receberá as instruções de recuperação",
      });
    } catch (error) {
      console.error("Erro detalhado:", error);
      return NextResponse.json(
        { error: "Erro ao processar solicitação" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro ao processar recuperação de senha:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
}
