// La documentation technique conserve la présentation historique « prose ».
// L’overview dispose d’un canevas complet, sans casser les pages MDX.
export default function TechnologyLayout({ children }) {
  return (
    <div className="technology-shell max-w-5xl mx-auto my-12 px-6 py-10 bg-white border border-gray-200 rounded-lg shadow-sm prose prose-slate dark:prose-invert">
      {children}
    </div>
  );
}
