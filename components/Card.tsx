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
    <div className="block h-full rounded-xl border border-[var(--koa-line)] bg-white p-6 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--koa-accent)] hover:shadow-[0_8px_24px_rgba(19,41,40,0.08)]">
      <h3 className="mb-3 font-serif text-xl font-medium tracking-tight text-[var(--koa-ink)]">{title}</h3>
      <div className="text-sm leading-relaxed text-[var(--koa-muted)]">
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