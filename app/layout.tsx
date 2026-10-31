import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UI Component — Dynamic Accordion Gallery',
  description: 'High-performance developer-focused accordion gallery component built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        suppressHydrationWarning={true}
        className="bg-[#050505] text-white antialiased selection:bg-rose-900 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}