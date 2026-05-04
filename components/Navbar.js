'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'الرئيسية' },
    { href: '/lessons', label: 'الدروس' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/80 text-slate-700 shadow-sm backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-cairo font-bold text-xl bg-gradient-to-l from-blue-700 to-violet-600 bg-clip-text text-transparent">
          تعلم البرمجة
        </span>
        <div className="flex gap-2 rounded-full bg-slate-100 p-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full ${
                pathname === link.href
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
