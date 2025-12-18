import Link from 'next/link';

export function Card({ title, description, children, href }) {
  // Use children if description is missing (common in MDX usage)
  const content = description || children;

  const cardContent = (
    <div className="block bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition-shadow h-full">
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <div className="text-gray-700 text-sm leading-relaxed">
        {content}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// Keep default export just in case other files use it that way
export default Card;