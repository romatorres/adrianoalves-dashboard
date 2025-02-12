import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY não configurada");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Barbearia <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Erro Resend:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw error;
  }
}
