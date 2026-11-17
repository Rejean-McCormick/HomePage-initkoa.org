// components\PageSection.js
// components/PageSection.js
export default function PageSection({ children, className = '' }) {
  return (
    <section
      className={`max-w-4xl mx-auto my-12 px-4 py-10 bg-[var(--koa-surface)] border
                  border-[var(--koa-line)] rounded-xl shadow-sm prose prose-slate ${className}`}
    >
      {children}
    </section>
  );
}
