import { useEffect, useRef, useState } from "react";

import { nr1Timeline, statCallouts } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

import { Eyebrow, Lede, Section, SectionHeading } from "./layout";

function highlightText(text: string, highlight: string) {
  const index = text.indexOf(highlight);
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <strong className="text-foreground">{highlight}</strong>
      {text.slice(index + highlight.length)}
    </>
  );
}

export function Nr1Section() {
  const timelineRef = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = timelineRef.current;
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
    <Section id="nr1" className="border-y border-border/60">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow>ALERTA REGULATÓRIO</Eyebrow>
          <SectionHeading>
            A partir de maio de 2026, isso vira uma questão de fiscalização.
          </SectionHeading>
          <Lede>
            A NR-1 passou a exigir que riscos psicossociais sejam formalmente geridos por toda
            empresa — e o comportamento de liderança está na lista.
          </Lede>
        </div>

        <ul ref={timelineRef} className="list-none space-y-0">
          {nr1Timeline.map((item, index) => (
            <li
              key={item.date}
              className={cn(
                "relative border-l-2 border-border pb-7 pl-7 transition-all duration-700 ease-out last:border-l-transparent last:pb-0",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: `${index * 1000}ms` }}
            >
              <span
                className="absolute -left-[7px] top-0.5 size-3 rounded-full border-2 border-primary bg-card"
                aria-hidden
              />
              <span className="mb-1 block font-body text-[13px] text-accent-text">{item.date}</span>
              <span className="text-[15px] text-muted-foreground">
                {highlightText(item.description, item.highlight)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {statCallouts.map((stat) => (
          <div
            key={stat.value}
            className="rounded-[10px] border border-primary/35 bg-primary/14 p-[26px]"
          >
            <span className="mb-2 block font-display text-[38px] leading-none text-primary">
              {stat.value}
            </span>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-r-[10px] border-l-[3px] border-primary bg-card px-6 py-[22px] text-[15px] text-muted-foreground">
        O ponto que a maioria das empresas ainda não conectou: especialistas listam o{" "}
        <strong className="text-accent-text">comportamento de liderança</strong> como um dos fatores
        de risco psicossocial a serem geridos. Um líder que não sabe dar feedback e gerencia pressão
        jogando pressão pra baixo não é só um problema de gestão de pessoas — é um fator de risco que
        a fiscalização pode identificar.
      </div>

      <p className="mt-9 border-t border-dashed border-border pt-5 font-body text-[13px] leading-relaxed text-muted-foreground">
        IMPORTANTE: a UPtoME não substitui o laudo técnico, o inventário de riscos nem o PGR formal —
        isso continua sendo trabalho de SESMT/consultoria especializada em segurança do trabalho. O
        que a UPtoME faz é dar ao RH a ferramenta prática do dia a dia para que a liderança pare de
        ser, ela mesma, uma fonte de risco psicossocial.
        <br />
        <br />
        Dados verificados em ago/2026 — confirme valores e prazos com jurídico/consultoria de
        segurança do trabalho antes de publicar esta página.
      </p>
    </Section>
  );
}
