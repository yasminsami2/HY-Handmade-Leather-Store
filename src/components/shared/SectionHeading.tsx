import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  intro?: string;
  href?: string;
  hrefLabel?: string;
  external?: boolean;
}

export function SectionHeading({ title, intro, href, hrefLabel, external = false }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-display-lg">{title}</h2>
        {intro ? <p className="mt-3 max-w-xl text-ink/70">{intro}</p> : null}
      </div>
      {href && hrefLabel && external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost !px-0 !py-1 shrink-0 self-start sm:self-auto"
        >
          {hrefLabel}
        </a>
      ) : href && hrefLabel ? (
        <Link href={href} className="btn btn-ghost !px-0 !py-1 shrink-0 self-start sm:self-auto">
          {hrefLabel}
        </Link>
      ) : null}
    </div>
  );
}
