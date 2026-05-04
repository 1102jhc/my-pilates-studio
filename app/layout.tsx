import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pilates Studio',
  description: 'Premium Pilates Studio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="antialiased text-slate-800">{children}</body>
    </html>
  );
}