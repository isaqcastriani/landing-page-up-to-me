// Telas do produto desenhadas em código para a LP nova.
// Linguagem visual inspirada no Calendly: cada tela é um card branco, limpo e
// grande, flutuando sobre um "palco" com gradiente suave e listras finas nas
// laterais. Quando a Paula mandar os prints reais, dá pra trocar por imagem.
import { Check, ChartColumn, MessageCircleHeart, Mic, Sparkles, UserRound, type LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Palco                                                               */
/* ------------------------------------------------------------------ */

export type StageTone = "lilas" | "laranja" | "roxo" | "creme";

const stageBackground: Record<StageTone, string> = {
  lilas:
    "radial-gradient(60% 70% at 15% 20%, #ffffff 0%, transparent 60%), radial-gradient(55% 60% at 85% 85%, #f6d9c8 0%, transparent 65%), radial-gradient(70% 80% at 80% 10%, #d9bdf0 0%, transparent 60%), #efe4f7",
  laranja:
    "radial-gradient(60% 70% at 20% 15%, #fff6ef 0%, transparent 60%), radial-gradient(60% 70% at 85% 90%, #e8cff5 0%, transparent 60%), radial-gradient(70% 80% at 90% 10%, #ffc9a8 0%, transparent 60%), #fde9de",
  roxo:
    "radial-gradient(60% 60% at 80% 15%, #8f3fc4 0%, transparent 60%), radial-gradient(55% 60% at 10% 90%, #e3540e55 0%, transparent 60%), radial-gradient(80% 80% at 20% 10%, #4a0a70 0%, transparent 70%), #2a0442",
  creme:
    "radial-gradient(60% 70% at 85% 20%, #eadcf5 0%, transparent 60%), radial-gradient(55% 60% at 10% 90%, #fbe3d6 0%, transparent 60%), #f7f1ea",
};

const stripes = (tone: StageTone): CSSProperties => ({
  backgroundImage: `repeating-linear-gradient(90deg, ${
    tone === "roxo" ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.75)"
  } 0 1px, transparent 1px 7px)`,
});

export function Stage({
  children,
  tone = "lilas",
  className,
}: {
  children: ReactNode;
  tone?: StageTone;
  className?: string;
}) {
  return (
    <div
      className={cn("relative isolate flex items-center justify-center overflow-hidden rounded-[1.6rem] p-6", className)}
      style={{ background: stageBackground[tone] }}
    >
      {/* listras verticais que somem em direção ao centro, como no Calendly */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/4 [mask-image:linear-gradient(90deg,black,transparent)]"
        style={stripes(tone)}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/4 [mask-image:linear-gradient(270deg,black,transparent)]"
        style={stripes(tone)}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card base                                                           */
/* ------------------------------------------------------------------ */

export function MockLabel({ icon: Icon, children, badge }: { icon: LucideIcon; children: ReactNode; badge?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--nv-tinta)]">
      <span className="flex size-6 items-center justify-center rounded-lg bg-[var(--nv-roxo)] text-white">
        <Icon className="size-3.5" strokeWidth={2.4} />
      </span>
      {children}
      {badge ? (
        <span className="rounded-md bg-[var(--nv-lilas)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--nv-roxo)]">
          {badge}
        </span>
      ) : null}
    </span>
  );
}

export function MockFrame({
  children,
  className,
  title,
  icon = Sparkles,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: LucideIcon;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.25rem] bg-white text-left text-[var(--nv-tinta)] shadow-[0_0_0_1px_rgba(90,0,136,0.07),0_2px_4px_rgba(51,0,77,0.04),0_28px_60px_-24px_rgba(51,0,77,0.38)]",
        className,
      )}
    >
      {title ? (
        <div className="px-5 pt-4">
          <MockLabel icon={icon}>{title}</MockLabel>
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function Waveform({ bars = 28, className }: { bars?: number; className?: string }) {
  return (
    <span className={cn("nv-wave flex h-7 items-center gap-[3px]", className)} aria-hidden>
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

/* ------------------------------------------------------------------ */
/* Telas                                                               */
/* ------------------------------------------------------------------ */

export function AudioBubble({ className }: { className?: string }) {
  return (
    <MockFrame className={cn("w-[19rem] p-4", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-[var(--nv-laranja)] text-[15px] font-bold text-white">
          R
        </span>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold">Rogério</p>
          <p className="text-[12.5px] text-[var(--nv-texto)]">Líder · Loja Centro</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-full bg-[var(--nv-lilas)] py-2 pr-4 pl-2 text-[var(--nv-roxo)]">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--nv-roxo)] text-white">
          <Mic className="size-4" strokeWidth={2.4} />
        </span>
        <Waveform bars={20} />
        <span className="ml-auto text-[13px] font-semibold tabular-nums">0:42</span>
      </div>
    </MockFrame>
  );
}

const feedbackBlocks = [
  { label: "O que aconteceu", text: "Você chegou depois das 9h em quatro dias nas últimas duas semanas." },
  { label: "Impacto", text: "A abertura da loja ficou com uma pessoa só." },
  { label: "Expectativa", text: "Precisamos da equipe completa às 9h." },
  { label: "Pra agir junto", text: "O que podemos ajustar na sua rotina pra isso acontecer?" },
] as const;

export function FeedbackCard({ className, compact = false }: { className?: string; compact?: boolean }) {
  const blocks = compact ? feedbackBlocks.filter((_, i) => i !== 2) : feedbackBlocks;
  return (
    <MockFrame className={cn("w-[21rem]", className)} title="Feedback gerado" icon={Sparkles}>
      <ol className="space-y-3 px-5 pt-3 pb-5">
        {blocks.map((block) => {
          const last = block.label === "Pra agir junto";
          return (
            <li key={block.label} className="flex gap-3">
              <span
                className={cn(
                  "mt-[5px] size-2 shrink-0 rounded-full",
                  last ? "bg-[var(--nv-laranja)]" : "bg-[var(--nv-roxo)]",
                )}
              />
              <div>
                <p className="text-[12px] font-semibold text-[var(--nv-texto)]">{block.label}</p>
                <p className={cn("text-[14px] leading-snug", last && "font-semibold text-[var(--nv-roxo)]")}>
                  {block.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </MockFrame>
  );
}

export function GeneratingCard({ className }: { className?: string }) {
  return (
    <MockFrame className={cn("w-64 px-5 py-5", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--nv-lilas)] text-[var(--nv-roxo)]">
          <Sparkles className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold">Gerando feedback</p>
          <p className="text-[12.5px] text-[var(--nv-texto)]">pro perfil da Camila</p>
        </div>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--nv-lilas)]">
        <div className="h-full w-2/3 rounded-full bg-[linear-gradient(90deg,var(--nv-roxo),var(--nv-laranja))]" />
      </div>
    </MockFrame>
  );
}

// Três cartões empilhados: o da frente mostra o que a IA tirou e por quê.
export function FeedbackOfFeedback({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-[19rem] pt-6", className)}>
      <div className="absolute inset-x-6 top-0 h-16 rounded-[1.25rem] bg-white/50 shadow-sm" />
      <div className="absolute inset-x-3 top-3 h-16 rounded-[1.25rem] bg-white/75 shadow-sm" />
      <MockFrame className="relative" title="O que a IA ajustou" icon={Sparkles}>
        <div className="px-5 pt-3 pb-5">
          <p className="text-[15px] font-semibold text-[var(--nv-laranja)] line-through decoration-2">
            &ldquo;você nunca leva nada a sério&rdquo;
          </p>
          <p className="mt-1 text-[13.5px] text-[var(--nv-texto)]">Julgamento sobre a pessoa, não sobre o fato.</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Julgamento", "Tom de bronca", "Sem expectativa"].map((tag, i) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[12px] font-semibold",
                  i === 0 ? "bg-[var(--nv-laranja-claro)] text-[var(--nv-laranja)]" : "bg-[var(--nv-creme)] text-[var(--nv-texto)]",
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </MockFrame>
    </div>
  );
}

export function ProfileCard({ className }: { className?: string }) {
  return (
    <MockFrame className={cn("w-full max-w-[19rem]", className)} title="Como falar com a Camila" icon={UserRound}>
      <div className="px-5 pt-3 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--nv-laranja),#f08a4b)] text-lg font-bold text-white">
            C
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-semibold">Camila</p>
            <p className="text-[12.5px] text-[var(--nv-texto)]">Decide rápido, gosta de objetivo claro</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-xl bg-[var(--nv-lilas)] px-3 py-2">
            <span className="text-[12px] font-semibold text-[var(--nv-roxo)]">Funciona</span>
            <span className="text-[13px]">meta, resultado, prazo</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[var(--nv-laranja-claro)] px-3 py-2">
            <span className="text-[12px] font-semibold text-[var(--nv-laranja)]">Evite</span>
            <span className="text-[13px]">rodeios, &ldquo;depois a gente vê&rdquo;</span>
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
    <MockFrame className={cn("w-full max-w-[19rem]", className)} title="A Camila reagiu" icon={MessageCircleHeart}>
      <div className="space-y-1.5 px-5 pt-3 pb-4">
        {reactions.map((reaction, i) => (
          <div
            key={reaction}
            className={cn(
              "flex items-center justify-between rounded-xl px-3 py-2 text-[13.5px]",
              i === active ? "bg-[var(--nv-roxo)] font-semibold text-white" : "bg-[var(--nv-creme)] text-[var(--nv-texto)]",
            )}
          >
            {reaction}
            {i === active ? <Check className="size-4" strokeWidth={3} /> : null}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-[var(--nv-linha)] px-5 py-3">
        <span className="size-2 rounded-full bg-[var(--nv-laranja)]" />
        <p className="text-[12.5px] text-[var(--nv-texto)]">Plano de ação criado · 22/09, 10:14</p>
      </div>
    </MockFrame>
  );
}

// Rede da empresa com o status de feedback de cada pessoa.
// Roxo = recebeu há pouco, laranja = faz tempo, cinza = nunca recebeu.
const people = [
  { x: 50, y: 16, s: "roxo", n: "P" },
  { x: 24, y: 44, s: "roxo", n: "A" },
  { x: 76, y: 44, s: "laranja", n: "R" },
  { x: 12, y: 80, s: "cinza", n: "J" },
  { x: 38, y: 80, s: "roxo", n: "C" },
  { x: 62, y: 80, s: "laranja", n: "M" },
  { x: 88, y: 80, s: "roxo", n: "L" },
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
    <MockFrame className={cn("w-full max-w-[22rem]", className)} title="Sua empresa" icon={UserRound}>
      <div className="relative mx-5 my-4 aspect-[4/3]">
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
                strokeWidth={1.2}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {people.map((p) => (
          <span
            key={p.n}
            className="absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--nv-lilas)] text-[15px] font-bold text-[var(--nv-roxo)] ring-4 ring-white"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.n}
            <span
              className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full ring-2 ring-white"
              style={{ background: statusColor[p.s] }}
            />
          </span>
        ))}
      </div>
      <div className="flex gap-4 border-t border-[var(--nv-linha)] px-5 py-3 text-[12px] text-[var(--nv-texto)]">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[var(--nv-roxo)]" /> recente
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[var(--nv-laranja)]" /> faz tempo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#b9b2bf]" /> nunca
        </span>
      </div>
    </MockFrame>
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
    <MockFrame className={cn("w-full max-w-[22rem]", className)} title="Feedbacks no mês" icon={ChartColumn}>
      <div className="space-y-3 px-5 pt-3 pb-4">
        {rows.map((row, i) => (
          <div key={row.area}>
            <div className="flex justify-between text-[13.5px]">
              <span>{row.area}</span>
              <span className="font-semibold tabular-nums">{Math.round(row.value / 4)}</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-[var(--nv-creme)]">
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
      </div>
      <p className="border-t border-[var(--nv-linha)] bg-[var(--nv-laranja-claro)] px-5 py-3 text-[13px] text-[var(--nv-tinta)]">
        O Financeiro está há 40 dias sem feedback.
      </p>
    </MockFrame>
  );
}

export function PhoneLoginMock({ className }: { className?: string }) {
  return (
    <MockFrame className={cn("w-full max-w-[19rem] px-6 pt-6 pb-5 text-center", className)}>
      <p className="text-[17px] font-semibold">Entrar na UPtoME</p>
      <p className="mt-1 text-[13px] text-[var(--nv-texto)]">Sem e-mail. Só o seu número.</p>
      <div className="mt-4 rounded-xl bg-[var(--nv-creme)] px-4 py-3 text-left text-[15px]">(11) 98765-4321</div>
      <div className="mt-3 flex justify-center gap-2">
        {["4", "8", "1", "", "", ""].map((d, i) => (
          <span
            key={i}
            className={cn(
              "flex size-9 items-center justify-center rounded-xl text-base font-semibold",
              d ? "bg-[var(--nv-lilas)] text-[var(--nv-roxo)]" : "bg-[var(--nv-creme)]",
              i === 3 && "ring-2 ring-[var(--nv-roxo)]",
            )}
          >
            {d}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[12.5px] text-[var(--nv-texto)]">Código enviado por SMS</p>
    </MockFrame>
  );
}
