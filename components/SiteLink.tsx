import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function SiteLink({ href, ...props }: Props) {
  if (href.startsWith("/") && !href.startsWith("//")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
