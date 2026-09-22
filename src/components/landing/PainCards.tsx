import { useEffect, useRef, useState } from "react";

import { painCards } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

export function PainCards() {
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
    <div ref={gridRef} className="mt-11 grid gap-5 md:grid-cols-2">
      {painCards.map((card, index) => (
        <article
          key={card.tag}
          className={cn(
            "rounded-[10px] border border-border bg-card p-[26px] transition-all duration-700 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
          style={{ transitionDelay: `${index * 1000}ms` }}
        >
          <span className="mb-2.5 block font-body text-xs tracking-wide text-accent-text">
            {card.tag}
          </span>
          <h3 className="mb-2 font-display text-[19px] font-semibold text-foreground">
            {card.title}
          </h3>
          <p className="text-[15px] text-muted-foreground">{card.description}</p>
        </article>
      ))}
    </div>
  );
}
