import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,filter] duration-200 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary:
    "bg-surface-raised text-primary border border-hairline hover:border-primary/30",
  ghost: "text-accent hover:bg-surface-raised",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;
type NativeProps = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export function Button(props: AnchorProps | NativeProps) {
  const { variant = "primary", size = "md", className = "", ...rest } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (typeof rest.href === "string") {
    const { href, ...anchor } = rest as AnchorProps;
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={cls} {...(anchor as ComponentPropsWithoutRef<"a">)} />
      );
    }
    return (
      <Link href={href} className={cls} {...(anchor as ComponentPropsWithoutRef<"a">)} />
    );
  }

  const { type, ...button } = rest as NativeProps;
  return (
    <button
      type={type ?? "button"}
      className={cls}
      {...(button as ComponentPropsWithoutRef<"button">)}
    />
  );
}
