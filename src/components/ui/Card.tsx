import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function IconBox({ name }: { name: string }) {
  return <div className="icon-box"><Icon name={name} /></div>;
}

export function Card({ icon, title, children, className = "" }: { icon?: string; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`card ${className}`}>
      {icon && <IconBox name={icon} />}
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
