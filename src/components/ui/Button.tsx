import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";

type Common = { variant?: "primary" | "ghost"; size?: "md" | "sm"; arrow?: boolean; children: ReactNode; className?: string };
type AsLink = Common & { href: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;
type AsButton = Common & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", arrow, children, className = "", href, ...rest } = props as AsLink;
  const cls = `btn btn--${variant} ${size === "sm" ? "btn--sm" : ""} ${className}`;
  const content = (<>{children}{arrow && <Icon name="arrow" size={18} />}</>);
  if (href) {
    const external = /^(https?:|mailto:)/.test(href);
    return external ? <a className={cls} href={href}>{content}</a> : <Link className={cls} to={href}>{content}</Link>;
  }
  return <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{content}</button>;
}
