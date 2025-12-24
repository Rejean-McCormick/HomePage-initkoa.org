// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g., adding Tailwind classes to all <h1>
    // h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
    ...components,
  }
}