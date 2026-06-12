"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ReadingSearchProps = {
  defaultValue?: string;
  placeholder?: string;
  paramName?: string;
  className?: string;
  debounceMs?: number;
};

export function ReadingSearch({
  defaultValue = "",
  placeholder = "Search reading library...",
  paramName = "q",
  className = "",
  debounceMs = 300,
}: ReadingSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(defaultValue);

  const currentQueryValue = searchParams.get(paramName) ?? "";

  useEffect(() => {
    setValue(currentQueryValue);
  }, [currentQueryValue]);

  const inputId = useMemo(
    () => `reading-search-${paramName}`,
    [paramName],
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const trimmed = value.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (trimmed) {
        params.set(paramName, trimmed);
      } else {
        params.delete(paramName);
      }

      params.delete("page");

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      startTransition(() => {
        router.replace(nextUrl, { scroll: false });
      });
    }, debounceMs);

    return () => window.clearTimeout(timeout);
  }, [
    value,
    pathname,
    router,
    searchParams,
    paramName,
    debounceMs,
  ]);

  function clearSearch() {
    setValue("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramName);
    params.delete("page");

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  }

  return (
    <search
      className={`w-full ${className}`}
      aria-label="Search reading library"
    >
      <label htmlFor={inputId} className="sr-only">
        Search reading library
      </label>

      <div className="relative">
        <input
          id={inputId}
          name={paramName}
          type="search"
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-24 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />

        <div className="absolute inset-y-0 right-2 flex items-center gap-2">
          {isPending ? (
            <span
              aria-live="polite"
              className="text-xs text-slate-400"
            >
              Searching…
            </span>
          ) : null}

          {value ? (
            <button
              type="button"
              onClick={clearSearch}
              className="rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>
    </search>
  );
}

export default ReadingSearch;