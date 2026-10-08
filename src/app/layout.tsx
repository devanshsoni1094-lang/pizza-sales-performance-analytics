import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pizza Sales Analytics | Power BI Web Dashboard',
  description: 'Interactive Next.js & React web application converted from Power BI Pizza Sales Analysis project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
