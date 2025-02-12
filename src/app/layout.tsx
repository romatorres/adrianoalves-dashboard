import type { Metadata } from "next";
import { Poller_One, Ubuntu, Nunito, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { AuthProvider } from "@/providers/auth";
import { Toaster } from "react-hot-toast";

const pollerOne = Poller_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poller-one",
});

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Barbearia Adriano Alves",
  description: "Corte perfeito, estilo único!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${pollerOne.variable} ${ubuntu.variable} ${nunito.variable} ${bebasNeue.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
