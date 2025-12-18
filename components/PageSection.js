// components\PageSection.js
// components/PageSection.js
export default function PageSection({ children, className = '' }) {
  return (
    <section
      className={`max-w-4xl mx-auto my-12 px-4 py-10 bg-white border
                  border-gray-200 rounded-lg shadow prose prose-slate
                  dark:prose-invert ${className}`}
    >
      {children}
    </section>
  );
}
