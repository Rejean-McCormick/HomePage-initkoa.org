type ReadingSourceLinkProps = {
  canonicalUrl?: string | null;
  source: string;
  label?: string;
  className?: string;
};

function formatSourceLabel(source: string) {
  return source
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function ReadingSourceLink({
  canonicalUrl,
  source,
  label,
  className,
}: ReadingSourceLinkProps) {
  if (!canonicalUrl || !isValidHttpUrl(canonicalUrl)) {
    return null;
  }

  const sourceLabel = label ?? formatSourceLabel(source);

  return (
    <a
      href={canonicalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center gap-1 text-sm font-medium text-[#1e6864] underline-offset-4 hover:underline"
      }
    >
      <span>Original source:</span>
      <span>{sourceLabel}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}