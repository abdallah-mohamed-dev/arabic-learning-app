import { Tajawal, Cairo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  variable: '--font-cairo',
});

export const metadata = {
  title: 'تعلم البرمجة بالعربي',
  description: 'تطبيق تعليمي تفاعلي لتعلم البرمجة باللغة العربية',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${cairo.variable} min-h-screen`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
