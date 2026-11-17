// components\PageSection.js
// components/PageSection.js
export default function PageSection({ children, className = '' }) {
  return (
    <section
      className={`koa-page-section max-w-5xl mx-auto my-10 px-5 sm:px-6 py-8 sm:py-10 bg-white border rounded-2xl shadow-sm prose prose-slate ${className}`}
    >
      {children}
    </section>
  );
}
