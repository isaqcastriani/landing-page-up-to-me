import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { QUIZ_LINK, steps } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

import { Eyebrow, Section, SectionHeading } from "./layout";

const btnClass = "h-auto rounded-[10px] px-7 py-4 text-base font-bold";

function StepTitle({ title, className }: { title: string; className?: string }) {
  return (
    <h3 className={className}>
      {title.split("\n").map((line, index) => (
        <span key={line}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
    </h3>
  );
}

type Step = (typeof steps)[number];

type StepFlipCardProps = {
  step: Step;
  index: number;
  delay: number;
  visible: boolean;
};

function StepFlipCard({ step, index, delay, visible }: StepFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const stepNumber = index + 1;

  return (
    <div
      className={cn(
        "relative isolate w-full transition-all duration-700 ease-out",
        visible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="group relative h-[360px] w-full cursor-pointer outline-none [perspective:1400px] focus-visible:ring-2 focus-visible:ring-primary-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        onClick={() => setFlipped((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setFlipped((current) => !current);
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${step.title}. ${flipped ? "Clique para voltar à capa." : `Clique para ver o passo ${stepNumber}.`}`}
      >
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-700 ease-in-out will-change-transform [transform-style:preserve-3d]",
            flipped && "[transform:rotateY(180deg)]",
            !flipped && "group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_48px_rgba(124,58,237,0.35)]",
          )}
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl bg-primary transition-colors duration-500 [backface-visibility:hidden] group-hover:bg-primary-dark">
            <div
              className="pointer-events-none absolute -left-1/2 -top-1/2 aspect-square w-[125%] rounded-full bg-black/15"
              aria-hidden
            />
            <div className="relative z-10 flex h-full flex-col p-8">
              <span className="font-display text-[clamp(3.5rem,8vw,4.5rem)] font-bold leading-none text-primary-foreground">
                {stepNumber}
              </span>

              <StepTitle
                title={step.title}
                className="my-auto w-full text-left font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-snug text-primary-foreground"
              />

              <div className="flex items-center justify-end gap-3 self-end transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-right font-body text-sm text-primary-foreground/90">
                  Clique para ver o passo {stepNumber}
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary-foreground/35 transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRight className="size-5 text-primary-foreground" aria-hidden />
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-primary-foreground/35 bg-transparent transition-colors duration-500 [backface-visibility:hidden] [transform:rotateY(180deg)] group-hover:bg-white/[0.03]">
            <div
              className="pointer-events-none absolute -left-1/2 -top-1/2 aspect-square w-[125%] rounded-full bg-transparent"
              aria-hidden
            />
            <div className="relative z-10 flex h-full flex-col p-8">
              <span className="font-display text-[clamp(2.75rem,6vw,3.5rem)] font-bold leading-none text-primary-foreground">
                {stepNumber}
              </span>

              <StepTitle
                title={step.title}
                className="mt-5 text-left font-display text-xl font-semibold text-primary-foreground"
              />

              <p className="mt-4 font-body text-base leading-relaxed text-primary-foreground/90">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StepsSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="como-funciona">
      <Eyebrow>COMO FUNCIONA</Eyebrow>
      <SectionHeading>
        Do diagnóstico à mudança de comportamento, sem meses de implantação.
      </SectionHeading>

      <div ref={gridRef} className="mt-11 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <StepFlipCard
            key={step.title}
            step={step}
            index={index}
            delay={index * 1000}
            visible={visible}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg" className={btnClass}>
          <a href={QUIZ_LINK}>Começar pelo diagnóstico gratuito</a>
        </Button>
      </div>
    </Section>
  );
}
