// app\technology\layout.js
export default function SectionLayout({ children }) {
  return (
    <div className="max-w-5xl mx-auto my-12 px-6 py-10 bg-white border border-gray-200 rounded-lg shadow-sm prose prose-slate dark:prose-invert">
      {children}
    </div>
  );
}
