import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Endo Woman | Dirección", description: "Prototipo local del ecosistema Endo Woman", robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-MX"><body>{children}</body></html>;
}
