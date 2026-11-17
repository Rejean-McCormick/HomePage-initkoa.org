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
    <div className="block bg-[var(--koa-surface)] border border-[var(--koa-line)] rounded-xl p-6 hover:border-primary hover:shadow-sm transition-colors h-full">
      <h3 className="font-serif text-lg font-medium text-[var(--koa-ink)] mb-2">{title}</h3>
      <div className="text-sm text-[var(--koa-muted)] leading-relaxed">
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