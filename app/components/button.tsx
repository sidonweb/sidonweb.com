import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_6px_18px_-8px_rgba(59,130,246,0.7)] hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_10px_24px_-8px_rgba(59,130,246,0.8)]",
  secondary:
    "border border-border-strong bg-surface-2 text-fg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_2px_6px_-3px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 hover:border-faint hover:bg-surface-3",
  ghost: "text-muted hover:bg-surface-2 hover:text-fg",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-3.5 py-2 text-[13px]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ease-out active:translate-y-0 active:scale-[0.97]";

type Props = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export default function Button({
  children,
  href,
  external,
  variant = "secondary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  ...rest
}: Props) {
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if (href) {
    const internal = href.startsWith("/") && !href.startsWith("/#");
    if (internal && !external) {
      return (
        <Link href={href} className={cls} {...rest}>
          {children}
        </Link>
      );
    }
    const isExt = external || /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        target={isExt ? "_blank" : undefined}
        rel={isExt ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}
