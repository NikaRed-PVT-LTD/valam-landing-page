import type { ReactNode } from "react";

export function PhoneFrame({ src, alt, small, children, priority }: { src?: string; alt?: string; small?: boolean; children?: ReactNode; priority?: boolean }) {
  return (
    <div className={`phone ${small ? "phone--sm" : ""}`}>
      <div className="phone__screen">
        {src && <img src={src} alt={alt ?? ""} width={900} height={1957} loading={priority ? "eager" : "lazy"} decoding="async" />}
        {children}
      </div>
    </div>
  );
}
