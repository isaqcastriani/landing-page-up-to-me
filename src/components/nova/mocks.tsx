// Telas do produto desenhadas em código para a LP nova.
// Seguem o que o briefing descreve do app. Quando a Paula mandar os prints
// da versão nova, dá pra trocar qualquer uma delas por imagem real.
import { Check, Mic, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function MockFrame({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[var(--nv-linha)] bg-white text-left text-[var(--nv-tinta)] shadow-[0_24px_60px_-28px_rgba(51,0,77,0.45)]",
        className,
      )}
    >
      {title ? (
        <div className="flex items-center justify-between border-b border-[var(--nv-linha)] px-4 py-2.5">
          <span className="text-[12.5px] font-semibold tracking-wide text-[var(--nv-texto)]">{title}</span>
          <span className="flex gap-1">
            <span className="size-1.5 rounded-full bg-[var(--nv-linha)]" />
            <span className="size-1.5 rounded-full bg-[var(--nv-linha)]" />
            <span className="size-1.5 rounded-full bg-[var(--nv-laranja)]" />
          </span>
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function Waveform({ bars = 28, className }: { bars?: number; className?: string }) {
  return (
    <span className={cn("nv-wave flex h-6 items-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-current"
          style={{
            height: `${30 + ((i * 37) % 70)}%`,
            animationDelay: `${(i % 7) * 0.12}s`,
          }}
        />
      ))}
    </span>
  );
}

export function AudioBubble({ className }: { className?: string }) {
  return (
    <MockFrame className={cn("w-72 p-3.5", className)}>
      <p className="text-[12.5px] font-semibold text-[var(--nv-texto)]">Líder · Loja Centro</p>
      <div className="mt-2 flex items-center gap-3 rounded-xl bg-[var(--nv-lilas)] px-3 py-2.5 text-[var(--nv-roxo)]">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--nv-roxo)] text-white">
          <Mic className="size-4" strokeWidth={2.2} />
        </span>
        <Waveform bars={22} />
        <span className="text-[12.5px] font-semibold tabular-nums">0:42</span>
      </div>
      <p className="mt-2 text-[12.5px] leading-snug text-[var(--nv-texto)]">
        &ldquo;De novo atrasado? Assim não dá...&rdquo;
      </p>
    </MockFrame>
  );
}

const feedbackBlocks = [
  {
    label: "Comportamento observado",
    text: "Nas últimas duas semanas você chegou depois das 9h em quatro dias.",
  },
  { label: "Impacto", text: "A abertura da loja ficou com uma pessoa só." },
  { label: "Expectativa", text: "Precisamos da equipe completa às 9h." },
  {
    label: "Pergunta pra agir junto",
    text: "O que podemos ajustar na sua rotina pra isso acontecer?",
  },
] as const;

export function FeedbackCard({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <MockFrame className={cn("w-80", className)} title="Feedback gerado">
      <div className={cn("space-y-2.5 p-4", compact && "space-y-2 p-3.5")}>
        {feedbackBlocks.map((block, i) => (
          <div key={block.label} className="flex gap-2.5">
            <span
              className={cn(
                "mt-1 h-auto w-1 shrink-0 rounded-full",
                i === 3 ? "bg-[var(--nv-laranja)]" : "bg-[var(--nv-roxo)]",
              )}
            />
            <div>
              <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--nv-roxo)] uppercase">
                {block.label}
              </p>
              <p className="text-[13.5px] leading-snug text-[var(--nv-tinta)]">{block.text}</p>
            </div>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

export function GeneratingCard({ className }: { className?: string }) {
  return (
    <MockFrame className={cn("w-60 px-5 py-6 text-center", className)}>
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--nv-lilas)] text-[var(--nv-roxo)]">
        <Sparkles className="size-5" />
      </span>
      <p className="mt-3 text-base font-semibold">Gerando feedback</p>
      <p className="mt-1 text-[12.5px] text-[var(--nv-texto)]">Considerando o perfil da Camila</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--nv-lilas)]">
        <div className="h-full w-2/3 rounded-full bg-[var(--nv-laranja)]" />
      </div>
    </MockFrame>
  );
}

export function FeedbackOfFeedback({ className }: { className?: string }) {
  const items = [
    { cut: "“você nunca leva nada a sério”", why: "Julgamento sobre a pessoa, não sobre o fato" },
    { cut: "“De novo??”", why: "Tom de bronca, fecha a conversa antes de abrir" },
    { cut: "“Assim não dá”", why: "Sem expectativa clara do que precisa mudar" },
  ];
  return (
    <MockFrame className={cn("w-full", className)} title="O que a IA ajustou">
      <ul className="space-y-2 p-4">
        {items.map((item) => (
          <li key={item.cut} className="rounded-xl bg-[var(--nv-creme)] px-3 py-2">
            <p className="text-[13.5px] font-semibold text-[var(--nv-laranja)] line-through decoration-2">
              {item.cut}
            </p>
            <p className="text-[12.5px] text-[var(--nv-texto)]">{item.why}</p>
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}

export function ProfileCard({ className }: { className?: string }) {
  return (
    <MockFrame className={cn("w-full", className)} title="Como falar com a Camila">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[var(--nv-laranja)] text-base font-bold text-white">
            C
          </span>
          <div>
            <p className="text-[14.5px] font-semibold">Camila · Atendimento</p>
            <p className="text-[12.5px] text-[var(--nv-texto)]">Decide rápido, gosta de objetivo claro</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-[var(--nv-lilas)] p-2.5">
            <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--nv-roxo)] uppercase">Funciona</p>
            <p className="mt-1 text-[12.5px] leading-snug">&ldquo;meta&rdquo;, &ldquo;resultado&rdquo;, &ldquo;prazo&rdquo;</p>
          </div>
          <div className="rounded-xl bg-[var(--nv-laranja-claro)] p-2.5">
            <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--nv-laranja)] uppercase">Evite</p>
            <p className="mt-1 text-[12.5px] leading-snug">rodeios, &ldquo;depois a gente vê&rdquo;</p>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

export const reactions = [
  "Foco no objetivo",
  "Vou criar o plano de ação",
  "Bora alinhar melhor",
  "Agradeço de verdade",
] as const;

export function ReactionsCard({ className, active = 1 }: { className?: string; active?: number }) {
  return (
    <MockFrame className={cn("w-full", className)} title="Camila recebeu seu feedback">
      <div className="p-4">
        <p className="text-[12.5px] text-[var(--nv-texto)]">Como ela reagiu</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {reactions.map((reaction, i) => (
            <span
              key={reaction}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[12.5px] font-medium",
                i === active
                  ? "border-[var(--nv-roxo)] bg-[var(--nv-roxo)] text-white"
                  : "border-[var(--nv-linha)] text-[var(--nv-tinta)]",
              )}
            >
              {reaction}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--nv-creme)] px-3 py-2">
          <Check className="size-3.5 text-[var(--nv-roxo)]" strokeWidth={3} />
          <p className="text-[12.5px]">Plano de ação criado · 22/09, 10:14</p>
        </div>
      </div>
    </MockFrame>
  );
}

// Rede da empresa com o status de feedback de cada pessoa.
// Roxo = recebeu há pouco, laranja = faz tempo, cinza = nunca recebeu.
const people = [
  { x: 50, y: 18, s: "roxo", n: "P" },
  { x: 22, y: 42, s: "roxo", n: "A" },
  { x: 78, y: 40, s: "laranja", n: "R" },
  { x: 12, y: 76, s: "cinza", n: "J" },
  { x: 38, y: 72, s: "roxo", n: "C" },
  { x: 62, y: 74, s: "laranja", n: "M" },
  { x: 88, y: 76, s: "roxo", n: "L" },
] as const;
const links = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
] as const;
const statusColor = {
  roxo: "var(--nv-roxo)",
  laranja: "var(--nv-laranja)",
  cinza: "#b9b2bf",
} as const;

export function NetworkMock({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[4/3] w-full", className)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {links.map(([a, b]) => {
          const pa = people[a];
          const pb = people[b];
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="var(--nv-lilas-forte)"
              strokeWidth={0.6}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      {people.map((p) => (
        <span
          key={p.n}
          className="absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[var(--nv-lilas)] text-base font-bold text-[var(--nv-roxo)] shadow-md"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          {p.n}
          <span
            className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-white"
            style={{ background: statusColor[p.s] }}
          />
        </span>
      ))}
    </div>
  );
}

export function ReportMock({ className }: { className?: string }) {
  const rows = [
    { area: "Loja Centro", value: 92 },
    { area: "Atendimento", value: 74 },
    { area: "Estoque", value: 48 },
    { area: "Financeiro", value: 30 },
  ];
  return (
    <div className={cn("w-full space-y-3", className)}>
      <p className="text-[12.5px] font-semibold text-[var(--nv-texto)]">Feedbacks no mês, por área</p>
      {rows.map((row, i) => (
        <div key={row.area}>
          <div className="flex justify-between text-[13.5px]">
            <span>{row.area}</span>
            <span className="font-semibold tabular-nums">{Math.round(row.value / 4)}</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-[var(--nv-lilas)]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${row.value}%`,
                background: i === 3 ? "var(--nv-laranja)" : "var(--nv-roxo)",
              }}
            />
          </div>
        </div>
      ))}
      <p className="rounded-xl bg-[var(--nv-laranja-claro)] px-3 py-2 text-[12.5px] text-[var(--nv-tinta)]">
        O Financeiro está há 40 dias sem feedback registrado.
      </p>
    </div>
  );
}

export function PhoneLoginMock({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[260px] space-y-3", className)}>
      <p className="text-center text-[14.5px] font-semibold">Entrar na UPtoME</p>
      <div className="rounded-xl border border-[var(--nv-linha)] px-3 py-2.5 text-[13.5px] text-[var(--nv-texto)]">
        (11) 98765-4321
      </div>
      <div className="flex justify-center gap-1.5">
        {["4", "8", "1", "", "", ""].map((d, i) => (
          <span
            key={i}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border text-base font-semibold",
              d ? "border-[var(--nv-roxo)] text-[var(--nv-roxo)]" : "border-[var(--nv-linha)]",
            )}
          >
            {d}
          </span>
        ))}
      </div>
      <p className="text-center text-[12.5px] text-[var(--nv-texto)]">Código enviado por SMS. Sem e-mail.</p>
    </div>
  );
}
