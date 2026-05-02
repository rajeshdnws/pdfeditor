'use client';

import PublicNavbar from '@/components/PublicNavbar';

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicNavbar />
      <main className="container mx-auto">
        {children}
      </main>
    </>
  );
}
