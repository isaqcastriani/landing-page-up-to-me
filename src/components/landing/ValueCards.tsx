import { useEffect, useRef, useState } from "react";

import { valueCards } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

export function ValueCards() {
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
    <div ref={gridRef} className="mt-11 grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
      {valueCards.map((card, index) => (
        <article
          key={card.num}
          className={cn(
            "rounded-[10px] border border-border bg-card px-5 py-6 transition-all duration-700 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
          style={{ transitionDelay: `${index * 1000}ms` }}
        >
          <span className="font-body text-[13px] text-dim">{card.num}</span>
          <h3 className="my-2.5 font-display text-lg font-semibold text-foreground">{card.title}</h3>
          <p className="text-sm text-muted-foreground">{card.description}</p>
        </article>
      ))}
    </div>
  );
}
