import type { ReactNode } from "react";
export function Badge({ children, highlight }: { children: ReactNode; highlight?: boolean }) {
  return <span className={`badge ${highlight ? "badge--hl" : ""}`}>{children}</span>;
}
