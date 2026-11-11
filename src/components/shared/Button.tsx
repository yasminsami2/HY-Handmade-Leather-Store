import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
  light: "btn btn-light",
};

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode };

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
