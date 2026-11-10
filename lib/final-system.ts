/** Public C0 target metadata; a static, reviewed design projection, not live deployment state. */
import manifest from '@/content/final-system/public-architecture.v1.json';

export type FunctionalChain = (typeof manifest.chains)[number];
export const finalArchitecture = manifest;
export function getFunctionalChain(id: string): FunctionalChain | undefined {
  return finalArchitecture.chains.find((chain) => chain.id.toUpperCase() === id.toUpperCase());
}
