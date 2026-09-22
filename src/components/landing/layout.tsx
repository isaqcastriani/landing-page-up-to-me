import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-6", className)}>{children}</div>
  );
}

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  panel?: boolean;
};

export function Section({ children, id, className, panel }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-8 py-16 md:py-24",
        panel && "bg-panel",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

type EyebrowProps = {
  children: ReactNode;
  center?: boolean;
};

export function Eyebrow({ children, center }: EyebrowProps) {
  return (
    <span
      className={cn(
        "mb-[18px] inline-flex items-center gap-2 font-body text-[13px] tracking-[1.5px] text-accent-text",
        center && "justify-center",
      )}
    >
      <span className="inline-block h-0.5 w-[22px] bg-primary" aria-hidden />
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "mb-4 font-display text-[clamp(1.625rem,3.5vw,2.375rem)] font-bold uppercase leading-[1.05] tracking-[0.3px] text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}

type LedeProps = {
  children: ReactNode;
  className?: string;
  center?: boolean;
};

export function Lede({ children, className, center }: LedeProps) {
  return (
    <p
      className={cn(
        "w-full font-body text-[clamp(17px,1.8vw,19px)] leading-relaxed text-muted-foreground",
        center && "mx-auto",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Microcopy({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-3 font-body text-[13px] text-muted-foreground", className)}>{children}</p>
  );
}
