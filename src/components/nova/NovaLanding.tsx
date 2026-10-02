import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  Handshake,
  Heart,
  MessageCircleHeart,
  MessageSquareText,
  Target,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  Menu,
  MessageCircle,
  ChartColumn,
  Mic,
  Smartphone,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import logotipoUptome from "@/assets/logotipo-uptome.png";
import logotipoV4 from "@/assets/logotipo-v4-branco.png";
import simbolo from "@/assets/nova/simbolo-uptome.png";
import fotoFarmacia from "@/assets/nova/foto-farmacia-audio.webp";
import fotoConsultoria from "@/assets/nova/foto-consultoria.webp";
import fotoPiscadela from "@/assets/nova/foto-piscadela.webp";
import fotoConversa from "@/assets/nova/foto-conversa.webp";
import fotoEstoque from "@/assets/nova/foto-estoque.webp";
import fotoRh from "@/assets/nova/foto-rh.webp";
import vslPoster from "@/assets/nova/vsl-poster.webp";
import {
  AudioBubble,
  FeedbackCard,
  FeedbackOfFeedback,
  GeneratingCard,
  MockFrame,
  MockLabel,
  NetworkMock,
  PhoneLoginMock,
  ProfileCard,
  ReactionsCard,
  ReportMock,
  Stage,
  reactions,
  type StageTone,
} from "@/components/nova/mocks";
import {
  captureUtms,
  formatWhatsapp,
  submitLead,
  track,
  validateLead,
  type Lead,
} from "@/lib/lead";
import {
  audiences,
  beforeAfter,
  collaboratorRanges,
  coexist,
  consultancy,
  faq,
  features,
  marquee,
  nav,
  reactionSteps,
  pains,
  platform,
  signals,
  steps,
} from "@/lib/nova-data";
import { cn } from "@/lib/utils";

const FORM_HREF = "#contato";
const VSL_SRC = "/video/vsl-uptome.mp4";

/* ------------------------------------------------------------------ */
/* Peças comuns                                                        */
/* ------------------------------------------------------------------ */

function useReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".nv");
    const items = document.querySelectorAll<HTMLElement>(".nv .nv-reveal");
    if (!root || !("IntersectionObserver" in window)) return;
    // O conteúdo nasce visível (SSR e sem JS). Só esconde o que ainda está
    // fora da tela, pra não piscar o que a pessoa já está vendo.
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
    });
    root.classList.add("nv-anim");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Mark({ children, laranja = false }: { children: ReactNode; laranja?: boolean }) {
  return <span className={cn("nv-mark", laranja && "nv-mark--laranja")}>{children}</span>;
}

function Cta({
  children = "Quero ver funcionando",
  size = "lg",
  variant = "laranja",
  className,
  onClick,
  href = FORM_HREF,
  local = "cta",
}: {
  children?: ReactNode;
  size?: "sm" | "lg";
  variant?: "laranja" | "roxo" | "branco";
  className?: string;
  onClick?: () => void;
  href?: string;
  local?: string;
}) {
  return (
    <a
      href={href}
      onClick={() => {
        track("cta_click", { local });
        onClick?.();
      }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--nv-roxo)]",
        size === "lg" ? "h-14 w-full max-w-[420px] px-8 text-lg sm:h-16 sm:w-auto sm:max-w-none sm:px-10 sm:text-2xl" : "h-10 px-5 text-base",
        variant === "laranja" &&
          "border border-[#d9661f]/35 bg-[#f7945a] text-[var(--nv-roxo-noite)] hover:bg-[#f5a06c]",
        variant === "roxo" && "bg-[var(--nv-roxo)] text-white hover:bg-[var(--nv-roxo-escuro)]",
        variant === "branco" && "bg-white text-[var(--nv-roxo)] hover:bg-[var(--nv-lilas)]",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
    </a>
  );
}

function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "nv-title text-center text-[2.1rem] font-bold text-[var(--nv-tinta)] sm:text-5xl lg:text-[3.4rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[15px] font-medium",
        dark
          ? "border border-white/20 text-white/90"
          : "bg-[var(--nv-roxo-noite)] text-white shadow-[0_8px_20px_-10px_rgba(30,6,48,0.8)]",
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Topo                                                                */
/* ------------------------------------------------------------------ */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <div className="mx-auto flex h-16 max-w-[1350px] items-center justify-between rounded-full border border-white/70 bg-white/80 pr-2 pl-5 shadow-[0_10px_40px_-20px_rgba(51,0,77,0.35)] backdrop-blur-xl sm:pl-7">
        <a href="#topo" aria-label="UPtoME, voltar ao topo" className="flex items-center gap-2">
          <img src={simbolo} alt="" className="h-8 w-auto" />
          <span className="nv-title text-xl font-semibold text-[#6f6a73]" style={{ letterSpacing: "-0.02em" }}>
            UP<span className="lowercase">to</span>ME
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Seções">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[17px] text-[var(--nv-texto)] transition-colors hover:text-[var(--nv-roxo)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Cta size="sm" className="hidden sm:inline-flex" local="header">
            Falar com a gente
          </Cta>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full bg-[var(--nv-lilas)] text-[var(--nv-roxo)] md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="mx-auto mt-2 max-w-[1350px] rounded-3xl border border-[var(--nv-linha)] bg-white p-3 shadow-xl md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-lg font-medium text-[var(--nv-tinta)] hover:bg-[var(--nv-lilas)]"
            >
              {item.label}
            </a>
          ))}
          <Cta size="sm" className="mt-2 h-12 w-full text-lg" local="menu-mobile" onClick={() => setOpen(false)}>
            Falar com a gente
          </Cta>
        </div>
      ) : null}
    </header>
  );
}

function Vsl() {
  const ref = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  function toggleSound() {
    const video = ref.current;
    if (!video) return;
    if (!soundOn) {
      video.currentTime = 0;
      video.muted = false;
      void video.play();
      track("vsl_play_com_som");
    } else {
      video.muted = true;
    }
    setSoundOn(!soundOn);
  }

  return (
    <div className="relative mx-auto w-[min(86vw,420px)]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[2.2rem] border-[6px] border-white bg-[var(--nv-roxo-noite)] shadow-[0_40px_90px_-30px_rgba(51,0,77,0.7)]">
        <video
          ref={ref}
          src={VSL_SRC}
          poster={vslPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label="Vídeo: como a UPtoME transforma o relato do líder em feedback"
        />
        <button
          type="button"
          onClick={toggleSound}
          className={cn(
            "absolute inset-x-4 bottom-4 flex h-12 items-center justify-center gap-2 rounded-full text-[17px] font-semibold backdrop-blur-md transition-colors",
            soundOn
              ? "bg-white/25 text-white"
              : "bg-[#f7945a] text-[var(--nv-roxo-noite)]",
          )}
        >
          {soundOn ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          {soundOn ? "Tirar o som" : "Ouvir com som (31s)"}
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden px-4 pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        <div className="nv-reveal">
          <Pill>
            <img src={simbolo} alt="" className="h-4 w-auto brightness-0 invert" />
            <span className="sm:hidden">Criado por consultoras de RH</span>
            <span className="hidden sm:inline">Criado por consultoras de RH, pra quem lidera gente</span>
          </Pill>
        </div>
        <h1 className="nv-reveal nv-title mt-7 text-[2.45rem] font-bold text-[var(--nv-tinta)] sm:text-6xl lg:text-[4.4rem]">
          Seu líder manda um áudio. A UPtoME devolve um <Mark>feedback</Mark> de verdade.
        </h1>
        <p className="nv-reveal mx-auto mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-[var(--nv-texto)] sm:text-2xl">
          Sem formulário e sem avaliação anual esquecida. A IA reescreve o que o líder disse pensando em quem vai
          receber, <strong className="font-semibold text-[var(--nv-tinta)]">registra tudo e mostra pra ele como falar melhor da próxima vez.</strong>
        </p>
        <div className="nv-reveal mx-auto mt-9 flex w-full max-w-[480px] flex-col">
          <Cta local="hero" className="relative z-10 w-full max-w-none" />
          <span className="mx-4 -mt-1 rounded-b-2xl bg-[var(--nv-roxo-noite)] px-4 pt-2.5 pb-2.5 text-center text-[13px] font-medium text-[#ffb489] sm:mx-8 sm:text-[15px]">
            <span className="sm:hidden">Demo pelo WhatsApp, sem compromisso</span>
            <span className="hidden sm:inline">Demonstração pelo WhatsApp, sem compromisso</span>
          </span>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-[1350px]">
        <p
          aria-hidden
          className="nv-title pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[21vw] font-extrabold text-[var(--nv-roxo)] opacity-[0.07] select-none lg:text-[15rem]"
        >
          FEEDBACK
        </p>
        <div className="relative flex items-center justify-center gap-10">
          <div className="hidden flex-col items-end gap-6 lg:flex">
            <AudioBubble className="nv-float" />
            <GeneratingCard className="nv-float [animation-delay:1.5s]" />
          </div>
          <Vsl />
          <div className="hidden lg:block">
            <FeedbackCard className="nv-float [animation-delay:0.8s]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dor                                                                 */
/* ------------------------------------------------------------------ */

function Pains() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px]">
        <SectionTitle className="nv-reveal">
          O treinamento acaba. O líder volta pra rotina e <Mark laranja>trava</Mark> na hora da conversa.
        </SectionTitle>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pains.map((pain, i) => (
            <article
              key={pain.title}
              className="nv-reveal rounded-3xl border border-[var(--nv-linha)] bg-white p-6 text-center sm:p-7 sm:text-left"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="nv-title text-4xl font-bold text-[var(--nv-laranja)]">0{i + 1}</span>
              <h3 className="mt-4 text-xl leading-snug font-semibold text-[var(--nv-tinta)]">{pain.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--nv-texto)]">{pain.description}</p>
            </article>
          ))}
        </div>
        <p className="nv-reveal mx-auto mt-10 max-w-3xl text-center text-lg sm:text-xl text-[var(--nv-texto)]">
          Não é falta de boa vontade do líder. Ninguém ensina a ter conversa difícil{" "}
          <strong className="text-[var(--nv-tinta)]">no momento em que ela acontece.</strong> É exatamente aí que a
          UPtoME entra.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Recursos                                                            */
/* ------------------------------------------------------------------ */

const featureTone = {
  audio: "lilas",
  "feedback-do-feedback": "laranja",
  perfil: "lilas",
  acao: "laranja",
} as const satisfies Record<(typeof features)[number]["key"], StageTone>;

function FeatureVisual({ id }: { id: (typeof features)[number]["key"] }) {
  if (id === "audio") {
    return (
      <div className="flex w-full flex-col items-center">
        <AudioBubble className="w-full max-w-[19rem]" />
        <span className="my-2 h-5 w-px bg-[var(--nv-roxo)]/30" />
        <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-[var(--nv-roxo)] shadow-[0_10px_30px_-12px_rgba(51,0,77,0.45)]">
          <MessageSquareText className="size-4 text-[var(--nv-laranja)]" />
          Feedback pronto em 4 partes
        </span>
      </div>
    );
  }
  if (id === "feedback-do-feedback") return <FeedbackOfFeedback />;
  if (id === "perfil") return <ProfileCard />;
  return <ReactionsCard />;
}

function Features() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <SectionTitle className="nv-reveal mx-auto max-w-4xl">
        Tudo que o líder precisa pra ter a <Mark>conversa certa</Mark>
      </SectionTitle>
      <div className="mx-auto mt-12 grid max-w-[1350px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => {
          const dark = feature.tone === "escuro";
          return (
          <article
            key={feature.key}
            className={cn(
              "nv-reveal flex flex-col rounded-[2rem] p-3",
              dark ? "bg-[var(--nv-roxo-noite)] text-white" : "border border-[var(--nv-linha)] bg-white",
            )}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="px-4 pt-4 pb-6 text-center sm:text-left">
              <span
                className={cn(
                  "inline-flex items-center gap-2 text-[15px] font-semibold",
                  dark ? "text-[#ffb489]" : "text-[var(--nv-roxo)]",
                )}
              >
                <img src={simbolo} alt="" className={cn("h-5 w-auto", dark && "brightness-0 invert")} />
                0{i + 1}
              </span>
              <h3 className="nv-title mt-3 text-2xl font-bold">{feature.title}</h3>
              <p className={cn("mt-3 text-[17px] leading-relaxed", dark ? "text-white/70" : "text-[var(--nv-texto)]")}>
                <strong className={dark ? "text-white" : "text-[var(--nv-tinta)]"}>{feature.lead}</strong>
                {feature.description}
              </p>
            </div>
            <Stage tone={featureTone[feature.key]} className="mt-auto min-h-[300px] px-4 py-8">
              <FeatureVisual id={feature.key} />
            </Stage>
          </article>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Como funciona                                                       */
/* ------------------------------------------------------------------ */

const STEP_MS = 5000;
const stepIcons = [Smartphone, Mic, MessageSquareText, ChartColumn] as const;

function StepVisual({ index }: { index: number }) {
  if (index === 0) return <PhoneLoginMock />;
  if (index === 1) {
    return (
      <div className="flex flex-col items-center gap-3">
        <AudioBubble />
        <GeneratingCard />
      </div>
    );
  }
  if (index === 2) return <NetworkMock />;
  return <ReportMock />;
}

function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((v) => (v + 1) % steps.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  return (
    <section id="como-funciona" className="scroll-mt-24 px-4 py-16 sm:py-24">
      <SectionTitle className="nv-reveal">
        Como <Mark>funciona:</Mark>
      </SectionTitle>
      <p className="nv-reveal mx-auto mt-5 max-w-3xl text-center text-lg sm:text-xl text-[var(--nv-texto)]">
        A UPtoME cuida da parte difícil: entender quem vai receber e achar as palavras certas. O líder só precisa
        contar o que aconteceu.
      </p>

      <div className="mx-auto mt-12 grid max-w-[1350px] items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Stage tone="roxo" className="nv-reveal min-h-[440px] sm:min-h-[500px]">
          <div key={active} className="nv-swap flex w-full justify-center">
            <StepVisual index={active} />
          </div>
        </Stage>

        <ol onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {steps.map((step, i) => {
            const on = i === active;
            const Icon = stepIcons[i] ?? MessageSquareText;
            return (
              <li
                key={step.title}
                className="nv-reveal border-b border-[var(--nv-linha)] first:border-t"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className="group block w-full py-6 text-left"
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                        on ? "bg-[var(--nv-roxo)] text-white" : "bg-[var(--nv-lilas)] text-[var(--nv-roxo)]/60",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <span
                      className={cn(
                        "nv-title flex-1 text-xl font-bold transition-colors sm:text-2xl",
                        on ? "text-[var(--nv-tinta)]" : "text-[var(--nv-tinta)]/45 group-hover:text-[var(--nv-tinta)]/70",
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="text-[15px] font-semibold text-[var(--nv-texto)]/60 tabular-nums">0{i + 1}</span>
                  </span>
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-3 pl-14 text-lg leading-relaxed text-[var(--nv-texto)]">
                        {step.description}
                      </span>
                    </span>
                  </span>
                </button>
                <span className="relative -mb-px block h-[2px] overflow-hidden">
                  {on ? (
                    <span
                      key={`${active}-${paused}`}
                      className={cn("absolute inset-y-0 left-0 bg-[var(--nv-roxo)]", paused ? "w-full" : "nv-progress")}
                      style={{ animationDuration: `${STEP_MS}ms` }}
                    />
                  ) : null}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="nv-reveal mt-12 text-center">
        <Cta local="como-funciona" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Antes e depois (seção escura)                                       */
/* ------------------------------------------------------------------ */

function Strike({ text, cut }: { text: string; cut: readonly string[] }) {
  const piece = cut[0];
  if (!piece || !text.includes(piece)) return <>{text}</>;
  const [before, after] = text.split(piece);
  return (
    <>
      {before}
      <span className="text-[var(--nv-laranja)] line-through decoration-2">{piece}</span>
      {after}
    </>
  );
}

const beforeAfterTone: StageTone[] = ["lilas", "laranja", "creme", "lilas"];

function BeforeAfter() {
  const track_ = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const el = track_.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.85, 440), behavior: "smooth" });
  }

  // Mobile: um card por vez, com setas e bolinhas abaixo do carrossel.
  const [current, setCurrent] = useState(0);

  function cards() {
    return Array.from(track_.current?.children ?? []) as HTMLElement[];
  }

  function goTo(i: number) {
    const el = track_.current;
    const card = cards()[i];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
  }

  function onTrackScroll() {
    const el = track_.current;
    if (!el) return;
    const list = cards();
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) return setCurrent(list.length - 1);
    const distance = list.map((card) => Math.abs(card.offsetLeft - 16 - el.scrollLeft));
    setCurrent(distance.indexOf(Math.min(...distance)));
  }

  return (
    <section className="px-2 py-8 sm:px-4">
      <div className="mx-auto max-w-[1350px] overflow-hidden rounded-[2.5rem] bg-[var(--nv-roxo-noite)] py-16 text-white sm:py-24">
        <div className="px-4 text-center">
          <div className="nv-reveal">
            <Pill dark>
              <img src={simbolo} alt="" className="h-4 w-auto brightness-0 invert" />
              <span className="sm:hidden">Antes e depois, no app</span>
              <span className="hidden sm:inline">Antes e depois, do jeito que acontece no app</span>
            </Pill>
          </div>
          <h2 className="nv-reveal nv-title mx-auto mt-6 max-w-4xl text-[2.1rem] font-bold sm:text-5xl lg:text-[3.4rem]">
            O que o líder manda. O que a pessoa{" "}
            <span className="text-[var(--nv-laranja)]">recebe.</span>
          </h2>
          <div className="nv-reveal mt-7 hidden justify-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Exemplo anterior"
              className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Próximo exemplo"
              className="flex size-11 items-center justify-center rounded-full bg-[var(--nv-laranja)] text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={track_}
          onScroll={onTrackScroll}
          className="relative mt-10 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:scroll-px-0 sm:gap-4 sm:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {beforeAfter.map((item, i) => (
            <article
              key={item.tema}
              className="flex w-[calc(100%-1.5rem)] shrink-0 snap-start flex-col rounded-[2rem] bg-white p-3 text-[var(--nv-tinta)] sm:w-[86vw] sm:max-w-[420px] sm:snap-center"
            >
              <div className="flex items-center justify-between px-3 pt-2 pb-4">
                <MockLabel icon={MessageCircle}>{item.tema}</MockLabel>
                <span className="rounded-md bg-[var(--nv-creme)] px-2 py-0.5 text-[12px] font-semibold text-[var(--nv-texto)]">
                  Exemplo
                </span>
              </div>
              <Stage tone={beforeAfterTone[i] ?? "lilas"} className="flex-1 flex-col items-stretch justify-start px-4 py-5">
                <div className="rounded-[1.1rem] bg-white/85 p-4 shadow-[0_0_0_1px_rgba(90,0,136,0.06)] backdrop-blur">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-full bg-[#e8e3ec] text-[13px] font-bold text-[var(--nv-texto)]">
                      L
                    </span>
                    <p className="text-[13px] font-semibold text-[var(--nv-texto)]">O líder mandou</p>
                  </div>
                  <p className="mt-2.5 text-[16px] leading-snug">
                    <Strike text={item.antes} cut={item.riscado} />
                  </p>
                </div>

                <div className="relative my-1 flex justify-center py-3">
                  <span className="absolute inset-y-0 left-1/2 w-px bg-[var(--nv-roxo)]/25" />
                  <span className="relative flex items-center gap-1.5 rounded-full bg-[var(--nv-roxo)] px-3 py-1 text-[12.5px] font-semibold text-white shadow-lg">
                    <ArrowDown className="size-3.5" />
                    UPtoME ajustou
                  </span>
                </div>

                <div className="rounded-[1.1rem] bg-white p-4 shadow-[0_0_0_1px_rgba(90,0,136,0.07),0_24px_50px_-24px_rgba(51,0,77,0.4)]">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-full bg-[var(--nv-laranja)] text-[13px] font-bold text-white">
                      C
                    </span>
                    <p className="text-[13px] font-semibold text-[var(--nv-roxo)]">A pessoa recebeu</p>
                  </div>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed">{item.depois}</p>
                </div>
              </Stage>
            </article>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-5 sm:hidden">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="Exemplo anterior"
            className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-opacity disabled:opacity-35"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            {beforeAfter.map((item, i) => (
              <button
                key={item.tema}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Exemplo ${i + 1}: ${item.tema}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === current ? "w-6 bg-[var(--nv-laranja)]" : "w-2 bg-white/30",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === beforeAfter.length - 1}
            aria-label="Próximo exemplo"
            className="flex size-12 items-center justify-center rounded-full bg-[var(--nv-laranja)] text-white transition-opacity disabled:opacity-35"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
        <p className="mt-6 px-4 text-center text-[15px] text-white/50">
          Exemplos ilustrativos. No app, a IA também considera o perfil e o histórico de quem recebe.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Para quem                                                           */
/* ------------------------------------------------------------------ */

function Audience() {
  return (
    <section id="para-quem" className="scroll-mt-24 px-4 py-16 sm:py-24">
      <SectionTitle className="nv-reveal mx-auto max-w-4xl">
        A UPtoME é pra <Mark>quem lidera gente</Mark>
      </SectionTitle>
      <div className="mx-auto mt-12 grid max-w-[1350px] gap-4 lg:grid-cols-3">
        {audiences.map((a, i) => {
          const dark = a.tone === "escuro";
          return (
            <article
              key={a.title}
              className={cn(
                "nv-reveal flex flex-col rounded-3xl p-6 text-center shadow-[0_20px_50px_-30px_rgba(51,0,77,0.4)] sm:p-8 sm:text-left",
                dark ? "bg-[var(--nv-roxo-noite)] text-white" : "bg-[var(--nv-lilas)]",
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <h3 className="nv-title text-3xl font-bold">{a.title}</h3>
              <p className={cn("mt-5 text-xl font-semibold", dark ? "text-white" : "text-[var(--nv-tinta)]")}>
                {a.lead}
              </p>
              <p className={cn("mt-2 text-xl leading-relaxed", dark ? "text-white/75" : "text-[var(--nv-texto)]")}>
                {a.description}
              </p>
              <img
                src={i === 0 ? fotoConsultoria : fotoRh}
                alt={
                  i === 0
                    ? "Consultora de RH conversando com o dono de uma loja"
                    : "Analista de RH sorrindo diante do notebook"
                }
                loading="lazy"
                className="mt-8 aspect-[3/2] w-full rounded-2xl object-cover"
              />
            </article>
          );
        })}
        <article className="nv-reveal flex flex-col rounded-3xl bg-[var(--nv-lilas)] p-6 text-center shadow-[0_20px_50px_-30px_rgba(51,0,77,0.4)] [transition-delay:180ms] sm:p-8 sm:text-left">
          <h3 className="nv-title text-3xl font-bold">E pra quem usa</h3>
          <p className="mt-5 text-lg sm:text-xl font-semibold">Se o seu time...</p>
          <ul className="mx-auto mt-3 w-fit space-y-2.5 text-left sm:mx-0">
            {signals.map((s) => (
              <li key={s} className="flex items-start gap-3 text-xl leading-snug font-medium">
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-[var(--nv-laranja)]" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-8 text-lg sm:text-xl leading-relaxed text-[var(--nv-texto)]">
            Se você já pensou &ldquo;o problema não é o time, é a conversa&rdquo;, é pra você.
          </p>
        </article>
      </div>
      <div className="nv-reveal mt-12 text-center">
        <Cta local="para-quem" />
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden py-6" aria-hidden>
      <div className="nv-marquee flex w-max gap-3">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn(
              "flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xl whitespace-nowrap",
              i % 2
                ? "border-[var(--nv-lilas-forte)] bg-[var(--nv-lilas)] font-semibold text-[var(--nv-roxo)]"
                : "border-[var(--nv-linha)] bg-white text-[var(--nv-tinta)]",
            )}
          >
            <img src={simbolo} alt="" className="h-4 w-auto" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Plataforma + consultoria                                            */
/* ------------------------------------------------------------------ */

function NumberBadge({ n }: { n: string }) {
  return (
    <span className="nv-title flex size-14 items-center justify-center rounded-full border-2 border-[var(--nv-tinta)] text-2xl font-bold">
      {n}
    </span>
  );
}

function PlatformAndPeople() {
  return (
    <section id="plataforma" className="scroll-mt-24 px-4 py-16 sm:py-24">
      <SectionTitle className="nv-reveal">
        Você não leva só a <Mark>ferramenta</Mark>
      </SectionTitle>
      <p className="nv-reveal mx-auto mt-5 max-w-3xl text-center text-lg sm:text-xl text-[var(--nv-texto)]">
        <strong className="text-[var(--nv-tinta)]">Plataforma sozinha não muda cultura. Treinamento sozinho evapora.</strong>{" "}
        A UPtoME junta as duas coisas: a ferramenta pro dia a dia e gente de RH do seu lado.
      </p>

      <div className="mx-auto mt-12 max-w-[1350px] space-y-4">
        <div className="nv-reveal grid gap-8 rounded-3xl border border-[var(--nv-linha)] bg-white p-5 sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex justify-center md:justify-start">
              <NumberBadge n="01" />
            </div>
            <h3 className="nv-title mt-5 text-center text-3xl font-bold md:text-left">A plataforma</h3>
            <p className="mt-3 text-center text-lg leading-relaxed text-[var(--nv-texto)] sm:text-xl md:text-left">
              Tudo que o líder e o RH precisam pra conversa acontecer, virar ação e ficar registrada.
            </p>
          </div>
          <ul className="space-y-2">
            {platform.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl bg-[var(--nv-roxo-noite)] px-4 py-3 text-[17px] font-medium text-white"
              >
                <ArrowRight className="size-4 shrink-0 text-[var(--nv-laranja)]" strokeWidth={2.6} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="nv-reveal grid gap-8 rounded-3xl bg-[var(--nv-lilas)] p-5 sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex justify-center md:justify-start">
              <NumberBadge n="02" />
            </div>
            <h3 className="nv-title mt-5 text-center text-3xl font-bold md:text-left">Gente de RH junto</h3>
            <p className="mt-3 text-center text-lg leading-relaxed text-[var(--nv-texto)] sm:text-xl md:text-left">
              A UPtoME nasceu de consultoras que passaram anos treinando liderança e viram o treino evaporar. Elas
              continuam do seu lado depois da venda.
            </p>
          </div>
          <ul className="space-y-2">
            {consultancy.map((item) => (
              <li
                key={item.strong}
                className="flex items-start gap-3 rounded-xl bg-[var(--nv-roxo-noite)] px-4 py-3.5 text-[17px] leading-snug text-white"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-[var(--nv-laranja)]" strokeWidth={2.6} />
                <span>
                  <strong>{item.strong}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="nv-reveal grid gap-4 sm:grid-cols-[1fr_2fr]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
            <img
              src={fotoEstoque}
              alt="Líder de estoque gravando um áudio no celular"
              loading="lazy"
              className="aspect-[4/3] h-full w-full rounded-2xl object-cover"
            />
            <img
              src={fotoConversa}
              alt="Líder e colaboradora numa conversa leve depois de um feedback"
              loading="lazy"
              className="aspect-[4/3] h-full w-full rounded-2xl object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={fotoFarmacia}
              alt="Gerente de farmácia gravando um feedback por áudio no balcão"
              loading="lazy"
              className="h-full min-h-[260px] w-full object-cover"
            />
            <AudioBubble className="absolute bottom-4 left-4 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Convive com o que já existe                                         */
/* ------------------------------------------------------------------ */

function Coexist() {
  return (
    <section className="px-4 py-12 sm:py-20">
      <div className="nv-reveal relative mx-auto grid max-w-[1350px] overflow-hidden rounded-[2.5rem] bg-[var(--nv-lilas)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[380px] sm:min-h-[360px]">
          <img
            src={fotoPiscadela}
            alt="Líder de equipe sorrindo e dando uma piscadela"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <ReactionsCard active={2} className="absolute right-4 bottom-4 hidden max-w-xs sm:block" />
        </div>
        <div className="p-5 text-center sm:p-12 sm:text-left">
          <Pill>
            <Check className="size-4" strokeWidth={3} />
            Nada de trocar de sistema
          </Pill>
          <h2 className="nv-title mt-6 text-[2.1rem] font-bold sm:text-5xl">
            E ainda <Mark>convive</Mark> com o que você já usa
          </h2>
          <div className="mt-8 space-y-3">
            {coexist.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white px-5 py-5 sm:px-6">
                <div className="flex flex-col-reverse items-center gap-2 sm:flex-row sm:justify-between sm:gap-3">
                  <p className="nv-title text-xl font-bold">{item.title}</p>
                  <span className="shrink-0 rounded-full bg-[var(--nv-laranja-claro)] px-3 py-1 text-[15px] font-semibold text-[var(--nv-laranja)]">
                    {item.tag}
                  </span>
                </div>
                <p className="mt-2 leading-snug text-[var(--nv-texto)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* "Bora alinhar melhor" (o momento de estranheza)                     */
/* ------------------------------------------------------------------ */

const reactionIcons = [Target, ClipboardList, Handshake, Heart] as const;

function BoraAlinhar() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((v) => (v + 1) % reactionSteps.length), 3800);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  const current = reactionSteps[active] ?? reactionSteps[0];

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <div className="nv-reveal">
            <Pill>
              <MessageCircleHeart className="size-4" />
              Depois do feedback
            </Pill>
          </div>
          <h2 className="nv-reveal nv-title mt-6 text-[2.1rem] font-bold sm:text-5xl">
            Ninguém rebate por mensagem. A pessoa escolhe o <Mark>próximo passo.</Mark>
          </h2>
          <p className="nv-reveal mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--nv-texto)] sm:text-xl lg:mx-0">
            Quem recebe o feedback não responde por texto, pra conversa não virar bate-boca. Toca numa das quatro
            reações e o líder já sabe o que acontece depois.
          </p>

          <ul
            className="nv-reveal mt-8 space-y-2 text-left"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {reactionSteps.map((step, i) => {
              const on = i === active;
              const Icon = reactionIcons[i] ?? Heart;
              return (
                <li key={step.reaction}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left transition-colors",
                      on ? "bg-white shadow-[0_0_0_1px_rgba(90,0,136,0.08),0_18px_40px_-24px_rgba(51,0,77,0.35)]" : "hover:bg-white/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                        on ? "bg-[var(--nv-roxo)] text-white" : "bg-[var(--nv-lilas)] text-[var(--nv-roxo)]/70",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className={cn("block text-lg font-semibold", !on && "text-[var(--nv-tinta)]/60")}>
                        {step.reaction}
                      </span>
                      <span className={cn("mt-0.5 block text-[17px] leading-snug text-[var(--nv-texto)]", !on && "opacity-70")}>
                        {step.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <Stage tone="laranja" className="nv-reveal min-h-[400px] flex-col gap-4 sm:min-h-[480px]">
          <ReactionsCard active={active} note={`${current.note} · agora`} className="w-full max-w-[21rem]" />
          <div
            key={active}
            className="nv-swap flex items-center gap-2 rounded-full bg-[var(--nv-roxo-noite)] px-4 py-2 text-[14px] font-medium text-white shadow-xl"
          >
            <Check className="size-4 text-[var(--nv-laranja)]" strokeWidth={3} />
            {current.note}
          </div>
        </Stage>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Oferta + formulário                                                 */
/* ------------------------------------------------------------------ */

function LeadForm() {
  const [lead, setLead] = useState<Lead>({ nome: "", empresa: "", whatsapp: "", cargo: "", colaboradores: "" });
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [waLink, setWaLink] = useState<string | null>(null);
  const started = useRef(false);

  function update<K extends keyof Lead>(key: K, value: Lead[K]) {
    if (!started.current) {
      started.current = true;
      track("form_start");
    }
    setLead((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validateLead(lead);
    setError(problem);
    if (problem) return;
    setStatus("sending");
    const link = await submitLead(lead);
    const w = window as Window & { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "lead_form_success" });
    setWaLink(link);
    setStatus("sent");
    if (link) window.open(link, "_blank", "noopener");
  }

  const field =
    "mt-2 h-14 w-full rounded-xl border border-[#f1dcc9] bg-white px-4 text-lg text-[var(--nv-tinta)] placeholder:text-[#a79d97] outline-none transition-colors focus:border-[var(--nv-laranja)]";
  const label = "text-[15px] font-semibold text-[var(--nv-tinta)]";
  const card =
    "rounded-[1.75rem] bg-white p-5 text-[var(--nv-tinta)] shadow-[0_30px_60px_-30px_rgba(120,50,10,0.45)] sm:p-8";

  if (status === "sent") {
    return (
      <div className={cn(card, "flex min-h-[520px] flex-col items-center justify-center text-center")}>
        <span className="flex size-14 items-center justify-center rounded-full bg-[var(--nv-roxo-noite)] text-white">
          <Check className="size-7" strokeWidth={3} />
        </span>
        <p className="nv-title mt-5 text-3xl font-bold">Recebemos, {lead.nome.split(" ")[0]}.</p>
        <p className="mt-3 max-w-sm text-lg text-[var(--nv-texto)]">
          A gente te chama no WhatsApp pra marcar a demonstração. Se preferir adiantar, fala com a gente agora.
        </p>
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--nv-roxo-noite)] px-6 font-semibold text-white"
          >
            <MessageCircle className="size-5" />
            Abrir o WhatsApp
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={card}>
      <p className="text-lg sm:text-xl font-semibold">Quero ver no meu time</p>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className={label}>Nome completo</span>
          <input
            className={field}
            name="nome"
            autoComplete="name"
            placeholder="Seu nome e sobrenome"
            value={lead.nome}
            onChange={(e) => update("nome", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={label}>WhatsApp</span>
          <input
            className={field}
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(11) 90000-0000"
            value={lead.whatsapp}
            onChange={(e) => update("whatsapp", formatWhatsapp(e.target.value))}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Empresa</span>
            <input
              className={field}
              name="empresa"
              autoComplete="organization"
              placeholder="Nome da empresa"
              value={lead.empresa}
              onChange={(e) => update("empresa", e.target.value)}
            />
          </label>
          <label className="block">
            <span className={label}>Cargo (opcional)</span>
            <input
              className={field}
              name="cargo"
              autoComplete="organization-title"
              placeholder="Ex.: dona, RH"
              value={lead.cargo}
              onChange={(e) => update("cargo", e.target.value)}
            />
          </label>
        </div>
        <label className="block">
          <span className={label}>Quantas pessoas trabalham aí?</span>
          <span className="relative block">
            <select
              className={cn(field, "appearance-none pr-12", !lead.colaboradores && "text-[#a79d97]")}
              name="colaboradores"
              value={lead.colaboradores}
              onChange={(e) => update("colaboradores", e.target.value)}
            >
              <option value="" disabled>
                Escolha uma faixa
              </option>
              {collaboratorRanges.map((range) => (
                <option key={range} value={range} className="text-[var(--nv-tinta)]">
                  {range}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 mt-1 size-5 -translate-y-1/2 text-[var(--nv-laranja)]" />
          </span>
        </label>
      </div>
      {error ? (
        <p role="alert" className="mt-4 rounded-xl bg-[var(--nv-laranja-claro)] px-4 py-2.5 text-[16px]">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 flex h-15 w-full items-center justify-center gap-2 rounded-full bg-[var(--nv-roxo-noite)] px-4 py-4 text-base font-semibold whitespace-nowrap sm:text-lg text-white transition-colors hover:bg-[var(--nv-roxo)] disabled:opacity-70"
      >
        {status === "sending" ? "Enviando..." : "Quero minha demonstração"}
        <ArrowRight className="size-5" />
      </button>
      <p className="mt-3 text-center text-[14px] text-[#a79d97]">
        Sem compromisso. Você só contrata se fizer sentido.
      </p>
    </form>
  );
}

const offerBullets = [
  { icon: MessageCircle, text: "Atendimento pelo WhatsApp" },
  { icon: CalendarCheck, text: "Demonstração de 30 minutos no seu contexto" },
  { icon: Lock, text: "Seus dados ficam só com a UPtoME" },
] as const;

function Offer() {
  return (
    <section id="contato" className="scroll-mt-20 px-3 py-12 sm:px-4 sm:py-20">
      <div className="relative mx-auto max-w-[1350px]">
        {/* mini cards que escapam do painel, como na referência */}
        <div className="absolute top-10 -left-4 z-10 hidden w-44 -rotate-6 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-20px_rgba(120,50,10,0.45)] xl:block">
          <p className="text-[13px] font-semibold">Próxima demo</p>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {["22", "23", "24", "25", "26", "29"].map((d, i) => (
              <span
                key={d}
                className={cn(
                  "flex h-7 items-center justify-center rounded-md text-[12px] font-medium",
                  i === 2 ? "bg-[var(--nv-roxo-noite)] text-white" : "bg-[var(--nv-creme)]",
                )}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute -right-4 bottom-16 z-10 hidden w-44 rotate-6 space-y-2 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-20px_rgba(120,50,10,0.45)] xl:block">
          <p className="text-[13px] font-semibold">Feedback gerado</p>
          <span className="block h-5 rounded-md bg-[var(--nv-creme)]" />
          <span className="block h-5 rounded-md bg-[var(--nv-creme)]" />
          <span className="block h-5 w-2/3 rounded-md bg-[var(--nv-laranja-claro)]" />
        </div>

        <div
          className="nv-reveal relative grid items-center gap-10 overflow-hidden rounded-[2rem] border border-[#f0b88f] px-4 py-8 sm:rounded-[2.5rem] sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:px-16 lg:py-16"
          style={{ background: "linear-gradient(180deg, #ffdcc3 0%, #ffc49b 50%, #ffa566 100%)" }}
        >
          <div className="text-center lg:text-left">
            <h2 className="nv-title text-[2.3rem] font-bold text-[var(--nv-tinta)] sm:text-5xl lg:text-[3.6rem]">
              Veja a UPtoME funcionando{" "}
              <span className="rounded-lg bg-[var(--nv-roxo-noite)] px-2.5 text-[#ffb489] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                no seu time.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--nv-tinta)]/75 sm:text-xl lg:mx-0">
              Deixa seu nome e o WhatsApp. A gente te chama, entende a sua realidade e mostra a ferramenta rodando.
            </p>
            <ul className="mx-auto mt-8 w-fit space-y-3 text-left lg:mx-0">
              {offerBullets.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-lg font-medium text-[var(--nv-tinta)]">
                  <Icon className="size-5 shrink-0" strokeWidth={2} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Perguntas frequentes                                                */
/* ------------------------------------------------------------------ */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" className="scroll-mt-24 px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="nv-reveal text-center lg:text-left">
          <h2 className="nv-title text-5xl font-bold sm:text-6xl">
            Perguntas
            <br />
            <span className="bg-[linear-gradient(transparent_62%,var(--nv-lilas-forte)_62%)]">frequentes</span>
          </h2>
          <p className="mx-auto mt-6 max-w-sm text-lg text-[var(--nv-texto)] sm:text-xl lg:mx-0">
            Ficou alguma dúvida que não está aqui? A gente responde no WhatsApp, com gente de verdade do outro lado.
          </p>
          <Cta size="lg" className="mt-8" local="faq">
            Falar com a gente
          </Cta>
        </div>
        <div className="border-t border-[var(--nv-tinta)]/15">
          {faq.map((item, i) => {
            const on = open === i;
            return (
              <div key={item.question} className="border-b border-[var(--nv-tinta)]/15 py-2">
                <div
                  className={cn(
                    "rounded-[1.4rem] transition-[background-color,box-shadow] duration-300",
                    on &&
                      "bg-[linear-gradient(160deg,#f3e9fb_0%,#fbf6ff_55%,#fdf1e9_100%)] shadow-[0_24px_50px_-28px_rgba(90,0,136,0.45),0_0_0_1px_rgba(90,0,136,0.06)]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left text-lg font-medium sm:px-6 sm:text-xl"
                  >
                    {item.question}
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full transition-colors",
                        on ? "bg-[var(--nv-roxo)]/10" : "",
                      )}
                    >
                      <span
                        className={cn(
                          "size-2.5 rounded-full transition-colors",
                          on ? "bg-[var(--nv-roxo)]" : "bg-[var(--nv-tinta)]/20",
                        )}
                      />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-400",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl px-5 pb-7 text-lg sm:text-xl leading-relaxed text-[var(--nv-texto)] sm:px-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA final + rodapé                                                  */
/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="px-4 pt-10 pb-16 sm:pb-24">
      <div className="relative mx-auto max-w-[1350px]">
        <div className="nv-reveal relative z-10 rounded-[2.5rem] bg-[var(--nv-lilas)] px-6 py-14 text-center sm:py-20">
          <h2 className="nv-title mx-auto max-w-2xl text-[2.1rem] font-bold sm:text-5xl lg:text-6xl">
            Você já viu como funciona. Agora é ver no <Mark>seu time.</Mark>
          </h2>
          <div className="mt-9">
            <Cta variant="roxo" local="final" />
          </div>
          <p className="mt-6 text-lg sm:text-xl text-[var(--nv-texto)]">
            Resposta pelo WhatsApp. Demonstração sem compromisso.
          </p>
        </div>
        <FeedbackCard compact className="absolute -top-16 -left-6 z-20 hidden rotate-[-4deg] xl:block" />
        <ReactionsCard className="absolute -right-6 -bottom-14 z-20 hidden w-80 rotate-[3deg] xl:block" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-28 sm:pb-10">
      <div className="mx-auto flex max-w-[1350px] flex-col items-center justify-between gap-5 rounded-3xl border border-[var(--nv-tinta)]/15 bg-white px-6 py-6 sm:flex-row sm:px-8">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
          <img src={logotipoUptome} alt="UPtoME" className="h-10 w-auto" />
          <span className="hidden h-6 w-px bg-[var(--nv-linha)] sm:block" />
          <span className="text-base text-[var(--nv-texto)]">© 2026 UPtoME. Desenvolvimento de pessoas centrado em feedback.</span>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-[var(--nv-roxo-noite)] px-4 py-2 text-base text-white/80">
          Desenvolvido por <img src={logotipoV4} alt="V4 Company" className="h-5 w-auto" />
        </span>
      </div>
    </footer>
  );
}

function MobileCtaBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contato");
      const nearForm = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.9 &&
        contact.getBoundingClientRect().bottom > 0 : false;
      setShow(window.scrollY > 700 && !nearForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-transform duration-300 sm:hidden",
        show ? "translate-y-0" : "translate-y-[140%]",
      )}
    >
      <a
        href={FORM_HREF}
        onClick={() => track("cta_click", { local: "barra-mobile" })}
        className="flex h-14 items-center justify-between rounded-full bg-[var(--nv-roxo-noite)] pr-2 pl-5 text-white shadow-2xl"
      >
        <span className="text-[17px] font-medium">Ver a UPtoME no meu time</span>
        <span className="flex h-10 items-center gap-1 rounded-full bg-[#f7945a] px-4 text-base font-semibold text-[var(--nv-roxo-noite)]">
          Falar <ArrowUpRight className="size-4" />
        </span>
      </a>
    </div>
  );
}

export function NovaLanding() {
  useReveal();
  useEffect(() => {
    captureUtms();
  }, []);

  return (
    <div className="nv min-h-screen overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <Pains />
        <Features />
        <HowItWorks />
        <BeforeAfter />
        <Audience />
        <Marquee />
        <PlatformAndPeople />
        <Coexist />
        <BoraAlinhar />
        <Offer />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}

