// lib/reading/slug.ts

const DEFAULT_FALLBACK_SLUG = "untitled";
const DEFAULT_HASH_LENGTH = 8;

export type SlugCollisionResolver = (slug: string) => boolean | Promise<boolean>;

export type CreateUniqueSlugOptions = {
  title: string;
  fallback?: string;
  hashInput?: string;
  exists?: SlugCollisionResolver;
  maxLength?: number;
};

export function slugify(input: string, fallback = DEFAULT_FALLBACK_SLUG): string {
  const slug = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .toLowerCase();

  return slug || fallback;
}

export function truncateSlug(slug: string, maxLength = 96): string {
  if (slug.length <= maxLength) {
    return slug;
  }

  return slug
    .slice(0, maxLength)
    .replace(/-+$/g, "")
    .trim();
}

export function createStableHash(input: string, length = DEFAULT_HASH_LENGTH): string {
  let hash = 5381;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 33) ^ input.charCodeAt(index);
  }

  return (hash >>> 0).toString(16).padStart(length, "0").slice(0, length);
}

export function appendSlugHash(
  slug: string,
  hashInput: string,
  maxLength = 96,
): string {
  const hash = createStableHash(hashInput);
  const suffix = `-${hash}`;
  const base = truncateSlug(slug, Math.max(1, maxLength - suffix.length));

  return `${base}${suffix}`;
}

export async function createUniqueSlug({
  title,
  fallback = DEFAULT_FALLBACK_SLUG,
  hashInput,
  exists,
  maxLength = 96,
}: CreateUniqueSlugOptions): Promise<string> {
  const baseSlug = truncateSlug(slugify(title, fallback), maxLength);

  if (!exists) {
    return baseSlug;
  }

  const hasCollision = await exists(baseSlug);

  if (!hasCollision) {
    return baseSlug;
  }

  const stableInput = hashInput || title || baseSlug;
  const hashedSlug = appendSlugHash(baseSlug, stableInput, maxLength);

  if (!(await exists(hashedSlug))) {
    return hashedSlug;
  }

  let counter = 2;

  while (counter < 1000) {
    const suffix = `-${counter}`;
    const candidate = `${truncateSlug(
      hashedSlug,
      Math.max(1, maxLength - suffix.length),
    )}${suffix}`;

    if (!(await exists(candidate))) {
      return candidate;
    }

    counter += 1;
  }

  throw new Error(`Unable to create a unique slug for "${title}".`);
}

export function createInternalReadingPath(slug: string): string {
  return `/reading/${slug}`;
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function assertValidSlug(slug: string): void {
  if (!isValidSlug(slug)) {
    throw new Error(
      `Invalid slug "${slug}". Slugs must be lowercase kebab-case and contain only letters, numbers, and hyphens.`,
    );
  }
}