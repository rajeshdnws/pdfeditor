import { AuthProvider } from '@/lib/AuthContext';
import '@/styles/globals.css';

export const metadata = {
  title: 'PDF Editor - Edit PDFs Online',
  description: 'Professional PDF editing tool similar to Sejda',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
