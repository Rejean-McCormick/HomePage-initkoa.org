// components\Card.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string; // Optional
  children?: ReactNode; // Optional
  href?: string;
}

export function Card({ title, description, children, href }: CardProps) {
  // Use children if present; otherwise fallback to description
  const content = children || description;

  const cardContent = (
    <div className="block bg-slate-50 border border-slate-200 rounded-sm p-6 hover:border-slate-300 transition-colors h-full">
      <h3 className="font-serif text-lg font-medium text-slate-900 mb-2">{title}</h3>
      <div className="text-sm text-slate-600 leading-relaxed">
        {content}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// Default export for backward compatibility
export default Card;