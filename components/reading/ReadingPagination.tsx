import Link from "next/link";

type SearchParamsValue = string | string[] | number | undefined | null;

type ReadingPaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  searchParams?: Record<string, SearchParamsValue> | URLSearchParams;
  pageParam?: string;
  siblingCount?: number;
  className?: string;
};

type PaginationItem = number | "ellipsis";

export function ReadingPagination({
  currentPage,
  totalPages,
  basePath = "/reading",
  searchParams,
  pageParam = "page",
  siblingCount = 1,
  className,
}: ReadingPaginationProps) {
  const safeTotalPages = Math.max(1, Math.floor(totalPages || 1));
  const safeCurrentPage = clamp(
    Math.floor(currentPage || 1),
    1,
    safeTotalPages,
  );

  if (safeTotalPages <= 1) {
    return null;
  }

  const items = getPaginationItems({
    currentPage: safeCurrentPage,
    totalPages: safeTotalPages,
    siblingCount,
  });

  const previousPage = safeCurrentPage - 1;
  const nextPage = safeCurrentPage + 1;

  return (
    <nav
      className={cx("mt-10 flex items-center justify-center", className)}
      aria-label="Reading pagination"
    >
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <PaginationLink
            href={buildPageHref({
              basePath,
              searchParams,
              pageParam,
              page: previousPage,
            })}
            disabled={safeCurrentPage === 1}
            ariaLabel="Go to previous page"
          >
            Previous
          </PaginationLink>
        </li>

        {items.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <li
                key={`ellipsis-${index}`}
                className="flex h-10 min-w-10 items-center justify-center px-2 text-sm text-slate-500"
                aria-hidden="true"
              >
                …
              </li>
            );
          }

          const isCurrent = item === safeCurrentPage;

          return (
            <li key={item}>
              <PaginationLink
                href={buildPageHref({
                  basePath,
                  searchParams,
                  pageParam,
                  page: item,
                })}
                active={isCurrent}
                ariaLabel={`Go to page ${item}`}
                ariaCurrent={isCurrent ? "page" : undefined}
              >
                {item}
              </PaginationLink>
            </li>
          );
        })}

        <li>
          <PaginationLink
            href={buildPageHref({
              basePath,
              searchParams,
              pageParam,
              page: nextPage,
            })}
            disabled={safeCurrentPage === safeTotalPages}
            ariaLabel="Go to next page"
          >
            Next
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
}

function PaginationLink({
  href,
  active = false,
  disabled = false,
  ariaLabel,
  ariaCurrent,
  children,
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  ariaLabel: string;
  ariaCurrent?: "page";
  children: React.ReactNode;
}) {
  const className = cx(
    "flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm transition",
    active
      ? "border-slate-900 bg-slate-900 text-white"
      : "border-slate-300 bg-white text-slate-800 hover:border-slate-900 hover:text-slate-950",
    disabled &&
      "pointer-events-none border-slate-200 bg-slate-50 text-slate-400",
  );

  if (disabled) {
    return (
      <span className={className} aria-label={ariaLabel} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </Link>
  );
}

function getPaginationItems({
  currentPage,
  totalPages,
  siblingCount,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount: number;
}): PaginationItem[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPage = 1;
  const lastPage = totalPages;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + siblingCount * 2;
    return [...range(1, leftItemCount), "ellipsis", lastPage];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + siblingCount * 2;
    return [
      firstPage,
      "ellipsis",
      ...range(totalPages - rightItemCount + 1, totalPages),
    ];
  }

  return [
    firstPage,
    "ellipsis",
    ...range(leftSiblingIndex, rightSiblingIndex),
    "ellipsis",
    lastPage,
  ];
}

function buildPageHref({
  basePath,
  searchParams,
  pageParam,
  page,
}: {
  basePath: string;
  searchParams?: Record<string, SearchParamsValue> | URLSearchParams;
  pageParam: string;
  page: number;
}) {
  const params = normalizeSearchParams(searchParams);

  if (page <= 1) {
    params.delete(pageParam);
  } else {
    params.set(pageParam, String(page));
  }

  const queryString = params.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
}

function normalizeSearchParams(
  searchParams?: Record<string, SearchParamsValue> | URLSearchParams,
) {
  const params = new URLSearchParams();

  if (!searchParams) {
    return params;
  }

  if (searchParams instanceof URLSearchParams) {
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    return params;
  }

  for (const [key, value] of Object.entries(searchParams)) {
    if (value == null || value === "") {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item != null && item !== "") {
          params.append(key, String(item));
        }
      }
    } else {
      params.set(key, String(value));
    }
  }

  return params;
}

function range(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => start + index);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}