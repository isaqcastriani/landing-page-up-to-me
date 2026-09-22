import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Menu,
  MessageCircle,
  Minus,
  Plus,
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
  NetworkMock,
  PhoneLoginMock,
  ProfileCard,
  ReactionsCard,
  ReportMock,
  reactions,
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
  offer,
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
        size === "lg" ? "h-14 px-8 text-xl sm:h-16 sm:px-10 sm:text-2xl" : "h-10 px-5 text-base",
        variant === "laranja" &&
          "bg-[var(--nv-laranja)] text-white shadow-[0_14px_30px_-12px_rgba(227,84,14,0.75)] hover:bg-[#cc4a0b]",
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
    <div className="relative mx-auto w-[min(78vw,330px)]">
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
              : "bg-[var(--nv-laranja)] text-white shadow-[0_10px_24px_-8px_rgba(227,84,14,0.9)]",
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
            Criado por consultoras de RH, pra quem lidera gente
          </Pill>
        </div>
        <h1 className="nv-reveal nv-title mt-7 text-[2.45rem] font-bold text-[var(--nv-tinta)] sm:text-6xl lg:text-[4.4rem]">
          Seu líder manda um áudio. A UPtoME devolve um <Mark>feedback</Mark> de verdade.
        </h1>
        <p className="nv-reveal mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-[var(--nv-texto)] sm:text-2xl">
          Sem formulário e sem avaliação anual esquecida. A IA reescreve o que o líder disse pensando em quem vai
          receber, <strong className="font-semibold text-[var(--nv-tinta)]">registra tudo e mostra pra ele como falar melhor da próxima vez.</strong>
        </p>
        <div className="nv-reveal mx-auto mt-9 flex w-full max-w-[480px] flex-col">
          <Cta local="hero" className="relative z-10 w-full" />
          <span className="-mt-8 rounded-b-[2rem] bg-[var(--nv-roxo-noite)] px-4 pt-10 pb-3 text-center text-lg font-medium text-white">
            Demonstração pelo WhatsApp, sem compromisso
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
              className="nv-reveal rounded-3xl border border-[var(--nv-linha)] bg-white p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="nv-title text-4xl font-bold text-[var(--nv-laranja)]">0{i + 1}</span>
              <h3 className="mt-4 text-xl leading-snug font-semibold text-[var(--nv-tinta)]">{pain.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--nv-texto)]">{pain.description}</p>
            </article>
          ))}
        </div>
        <p className="nv-reveal mx-auto mt-10 max-w-3xl text-center text-xl text-[var(--nv-texto)]">
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

function FeatureVisual({ id }: { id: (typeof features)[number]["key"] }) {
  if (id === "audio") {
    return (
      <div className="space-y-2">
        <AudioBubble className="w-full" />
        <FeedbackCard compact className="w-full" />
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
                "nv-reveal flex flex-col overflow-hidden rounded-3xl",
                dark ? "bg-[var(--nv-roxo-noite)] text-white" : "bg-[var(--nv-lilas)] text-[var(--nv-tinta)]",
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="p-6 pb-5">
                <img
                  src={simbolo}
                  alt=""
                  className={cn("h-6 w-auto", dark && "brightness-0 invert")}
                />
                <h3 className="nv-title mt-4 text-2xl font-bold">{feature.title}</h3>
                <p className={cn("mt-3 text-[17px] leading-relaxed", dark ? "text-white/75" : "text-[var(--nv-texto)]")}>
                  <strong className={dark ? "text-white" : "text-[var(--nv-tinta)]"}>{feature.lead}</strong>
                  {feature.description}
                </p>
              </div>
              <div className="mt-auto px-3 pb-3">
                <FeatureVisual id={feature.key} />
              </div>
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

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="grid h-full place-items-center p-6">
        <PhoneLoginMock />
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="grid h-full place-items-center p-6">
        <AudioBubble className="w-full max-w-xs" />
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="grid h-full place-items-center p-6">
        <NetworkMock className="max-w-sm" />
      </div>
    );
  }
  return (
    <div className="grid h-full place-items-center p-6">
      <ReportMock className="max-w-sm" />
    </div>
  );
}

function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % steps.length), 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section id="como-funciona" className="scroll-mt-24 px-4 py-16 sm:py-24">
      <SectionTitle className="nv-reveal">
        Como <Mark>funciona:</Mark>
      </SectionTitle>
      <p className="nv-reveal mx-auto mt-5 max-w-3xl text-center text-xl text-[var(--nv-texto)]">
        A UPtoME cuida da parte difícil: entender quem vai receber e achar as palavras certas. O líder só precisa
        contar o que aconteceu.
      </p>

      <div className="mx-auto mt-12 grid max-w-[1350px] items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <MockFrame className="nv-reveal h-[340px] w-full sm:h-[380px]" title={`Passo ${active + 1} de ${steps.length}`}>
          <StepVisual index={active} />
        </MockFrame>

        <ol className="space-y-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {steps.map((step, i) => {
            const on = i === active;
            return (
              <li key={step.title} className="nv-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  aria-pressed={on}
                  className={cn(
                    "flex w-full items-center gap-5 rounded-3xl border px-5 py-5 text-left transition-colors sm:px-7",
                    on
                      ? "border-[var(--nv-lilas-forte)] bg-[var(--nv-lilas)]"
                      : "border-[var(--nv-linha)] bg-white hover:bg-[var(--nv-creme)]",
                  )}
                >
                  <span
                    className={cn(
                      "nv-title text-4xl font-bold sm:text-5xl",
                      on ? "text-[var(--nv-roxo)]" : "text-[var(--nv-tinta)]",
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className="flex-1">
                    <span className="nv-title block text-xl font-bold sm:text-2xl">{step.title}</span>
                    <span className="mt-1 block leading-snug text-[var(--nv-texto)]">{step.description}</span>
                  </span>
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      on ? "bg-[var(--nv-laranja)]" : "bg-[var(--nv-linha)]",
                    )}
                  />
                </button>
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

function BeforeAfter() {
  const track_ = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const el = track_.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.85, 420), behavior: "smooth" });
  }

  return (
    <section className="px-2 py-8 sm:px-4">
      <div className="overflow-hidden rounded-[2.5rem] bg-[var(--nv-roxo-noite)] py-16 text-white sm:py-24">
        <div className="px-4 text-center">
          <div className="nv-reveal">
            <Pill dark>
              <img src={simbolo} alt="" className="h-4 w-auto brightness-0 invert" />
              Antes e depois, do jeito que acontece no app
            </Pill>
          </div>
          <h2 className="nv-reveal nv-title mx-auto mt-6 max-w-4xl text-[2.1rem] font-bold sm:text-5xl lg:text-[3.4rem]">
            O que o líder manda. O que a pessoa{" "}
            <span className="text-[var(--nv-laranja)]">recebe.</span>
          </h2>
          <div className="nv-reveal mt-7 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Exemplo anterior"
              className="flex size-10 items-center justify-center rounded-full bg-[var(--nv-laranja)] text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Próximo exemplo"
              className="flex size-10 items-center justify-center rounded-full bg-[var(--nv-laranja)] text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={track_}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {beforeAfter.map((item) => (
            <article
              key={item.tema}
              className="w-[86vw] max-w-[400px] shrink-0 snap-center rounded-3xl bg-white p-5 text-[var(--nv-tinta)] sm:p-6"
            >
              <span className="rounded-full bg-[var(--nv-lilas)] px-3 py-1 text-[14px] font-semibold text-[var(--nv-roxo)]">
                {item.tema}
              </span>
              <p className="mt-5 text-[13px] font-bold tracking-[0.1em] text-[var(--nv-texto)] uppercase">
                O líder mandou
              </p>
              <p className="mt-2 rounded-2xl rounded-tl-sm bg-[#f1f0ee] px-4 py-3 text-[17px] leading-snug">
                <Strike text={item.antes} cut={item.riscado} />
              </p>
              <p className="mt-5 text-[13px] font-bold tracking-[0.1em] text-[var(--nv-roxo)] uppercase">
                A pessoa recebeu
              </p>
              <p className="mt-2 rounded-2xl rounded-tr-sm bg-[var(--nv-lilas)] px-4 py-3 text-[17px] leading-relaxed">
                {item.depois}
              </p>
            </article>
          ))}
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
                "nv-reveal flex flex-col rounded-3xl p-8 shadow-[0_20px_50px_-30px_rgba(51,0,77,0.4)]",
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
        <article className="nv-reveal flex flex-col rounded-3xl bg-[var(--nv-lilas)] p-8 shadow-[0_20px_50px_-30px_rgba(51,0,77,0.4)] [transition-delay:180ms]">
          <h3 className="nv-title text-3xl font-bold">E pra quem usa</h3>
          <p className="mt-5 text-xl font-semibold">Se o seu time...</p>
          <ul className="mt-3 space-y-2.5">
            {signals.map((s) => (
              <li key={s} className="flex items-start gap-3 text-xl leading-snug font-medium">
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-[var(--nv-laranja)]" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-8 text-xl leading-relaxed text-[var(--nv-texto)]">
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
      <p className="nv-reveal mx-auto mt-5 max-w-3xl text-center text-xl text-[var(--nv-texto)]">
        <strong className="text-[var(--nv-tinta)]">Plataforma sozinha não muda cultura. Treinamento sozinho evapora.</strong>{" "}
        A UPtoME junta as duas coisas: a ferramenta pro dia a dia e gente de RH do seu lado.
      </p>

      <div className="mx-auto mt-12 max-w-[1350px] space-y-4">
        <div className="nv-reveal grid gap-8 rounded-3xl border border-[var(--nv-linha)] bg-white p-7 sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <NumberBadge n="01" />
            <h3 className="nv-title mt-5 text-3xl font-bold">A plataforma</h3>
            <p className="mt-3 text-xl leading-relaxed text-[var(--nv-texto)]">
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

        <div className="nv-reveal grid gap-8 rounded-3xl bg-[var(--nv-lilas)] p-7 sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <NumberBadge n="02" />
            <h3 className="nv-title mt-5 text-3xl font-bold">Gente de RH junto</h3>
            <p className="mt-3 text-xl leading-relaxed text-[var(--nv-texto)]">
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
        <div className="relative min-h-[360px]">
          <img
            src={fotoPiscadela}
            alt="Líder de equipe sorrindo e dando uma piscadela"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <ReactionsCard active={2} className="absolute right-4 bottom-4 left-4 max-w-xs sm:left-auto" />
        </div>
        <div className="p-7 sm:p-12">
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
                <div className="flex items-center justify-between gap-3">
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

function BoraAlinhar() {
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(new Date()),
    );
  }, []);

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px]">
        <div className="nv-reveal flex flex-wrap items-end justify-between gap-6">
          <h2 className="nv-title text-5xl font-bold sm:text-7xl lg:text-8xl">
            Bora alinhar
            <br />
            <span className="text-[var(--nv-roxo)]">
              melhor,
              <span aria-hidden className="nv-caret ml-1 inline-block h-[0.85em] w-[4px] translate-y-[0.08em] bg-[var(--nv-laranja)]" />
            </span>
          </h2>
          <div className="text-right">
            <div className="flex justify-end gap-2">
              <span className="flex size-10 items-center justify-center rounded-full border border-[var(--nv-linha)] bg-white text-[var(--nv-texto)]">
                ?
              </span>
              <span className="flex size-10 items-center justify-center rounded-full bg-[var(--nv-roxo)] text-base font-bold text-white">
                C
              </span>
            </div>
            <p className="mt-3 text-[var(--nv-texto)] first-letter:uppercase">{today}</p>
          </div>
        </div>

        <div className="nv-reveal mt-8 flex flex-col gap-4 rounded-3xl border border-[var(--nv-linha)] bg-white p-4 sm:flex-row sm:items-center sm:p-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--nv-lilas)]">
            <img src={simbolo} alt="" className="h-6 w-auto" />
          </span>
          <div className="flex-1">
            <p className="font-semibold">A Camila escolheu &ldquo;Bora alinhar melhor&rdquo;</p>
            <p className="text-base text-[var(--nv-texto)]">
              Feedback de segunda · a conversa agora é ao vivo, e fica registrada
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full border border-[var(--nv-linha)] px-4 py-2 text-base">ver histórico</span>
            <span className="rounded-full bg-[var(--nv-laranja)] px-4 py-2 text-base font-semibold text-white">
              Marcar conversa
            </span>
          </div>
        </div>
        <p className="nv-reveal mt-6 max-w-3xl text-xl text-[var(--nv-texto)]">
          Quem recebe não responde por texto, pra não virar toma-lá-dá-cá. Escolhe uma reação:{" "}
          {reactions.map((r, i) => (
            <span key={r}>
              <strong className="text-[var(--nv-tinta)]">{r}</strong>
              {i < reactions.length - 2 ? ", " : i === reactions.length - 2 ? " ou " : "."}
            </span>
          ))}{" "}
          A ferramenta abre a porta. A conversa continua sendo entre pessoas.
        </p>
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
    setWaLink(link);
    setStatus("sent");
    if (link) window.open(link, "_blank", "noopener");
  }

  const field =
    "mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 text-lg text-white placeholder:text-white/40 outline-none transition-colors focus:border-[var(--nv-laranja)] focus:bg-white/10";
  const label = "text-[14px] font-semibold tracking-[0.12em] text-white/70 uppercase";

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl bg-white/[0.06] p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-[var(--nv-laranja)]">
          <Check className="size-7" strokeWidth={3} />
        </span>
        <p className="nv-title mt-5 text-3xl font-bold">Recebemos, {lead.nome.split(" ")[0]}.</p>
        <p className="mt-3 max-w-sm text-white/75">
          A gente te chama no WhatsApp pra marcar a demonstração. Se preferir adiantar, fala com a gente agora.
        </p>
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[var(--nv-roxo)]"
          >
            <MessageCircle className="size-5" />
            Abrir o WhatsApp
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white/[0.06] p-6 sm:p-8">
      <p className="nv-title text-2xl font-bold">Quero ver a UPtoME no meu time</p>
      <p className="mt-1 text-white/65">Menos de 1 minuto. A resposta vem pelo WhatsApp.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Nome</span>
          <input
            className={field}
            name="nome"
            autoComplete="name"
            placeholder="Nome e sobrenome"
            value={lead.nome}
            onChange={(e) => update("nome", e.target.value)}
          />
        </label>
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
        <label className="block">
          <span className={label}>Cargo</span>
          <input
            className={field}
            name="cargo"
            autoComplete="organization-title"
            placeholder="Ex.: dona, gerente de RH"
            value={lead.cargo}
            onChange={(e) => update("cargo", e.target.value)}
          />
        </label>
      </div>
      <fieldset className="mt-5">
        <legend className={label}>Quantas pessoas trabalham aí?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {collaboratorRanges.map((range) => {
            const on = lead.colaboradores === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => update("colaboradores", range)}
                aria-pressed={on}
                className={cn(
                  "h-11 rounded-full border px-4 text-[17px] font-medium transition-colors",
                  on
                    ? "border-[var(--nv-laranja)] bg-[var(--nv-laranja)] text-white"
                    : "border-white/20 text-white/85 hover:border-white/50",
                )}
              >
                {range}
              </button>
            );
          })}
        </div>
      </fieldset>
      {error ? (
        <p role="alert" className="mt-4 rounded-xl bg-[var(--nv-laranja)]/20 px-4 py-2.5 text-[17px] text-white">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--nv-laranja)] text-xl font-semibold text-white shadow-[0_14px_30px_-12px_rgba(227,84,14,0.9)] transition-colors hover:bg-[#cc4a0b] disabled:opacity-70"
      >
        {status === "sending" ? "Enviando..." : "Quero minha demonstração"}
        <ArrowRight className="size-5" />
      </button>
      <p className="mt-3 text-center text-[15px] text-white/50">
        Seus dados só são usados pra esse contato. Sem spam.
      </p>
    </form>
  );
}

function Offer() {
  return (
    <section id="contato" className="scroll-mt-20 px-3 py-12 sm:px-4 sm:py-20">
      <div className="nv-reveal mx-auto grid max-w-[1350px] gap-10 overflow-hidden rounded-[2.5rem] bg-[radial-gradient(120%_90%_at_0%_0%,#3d0a5c_0%,var(--nv-roxo-noite)_55%)] p-6 text-white sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:p-14">
        <div>
          <h2 className="nv-title text-[2rem] font-bold sm:text-5xl">
            O que você leva quando fala com a{" "}
            <span className="text-[var(--nv-laranja)]">UPtoME</span>
          </h2>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {offer.map((item) => (
              <li key={item} className="flex items-start gap-3 py-4 text-xl">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--nv-laranja)]">
                  <Check className="size-3.5" strokeWidth={3.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-end gap-4">
            <p className="nv-title text-7xl leading-none font-bold text-[var(--nv-laranja)] sm:text-8xl">30</p>
            <p className="pb-2 text-xl leading-tight text-white/80">
              minutos de conversa
              <br />
              pra ver se faz sentido pro seu time
            </p>
          </div>
          <p className="mt-4 text-white/60">
            O plano é montado pro tamanho da sua empresa. Sem letra miúda e sem projeto de implantação de meses.
          </p>
        </div>
        <LeadForm />
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
        <div className="nv-reveal">
          <h2 className="nv-title text-5xl font-bold sm:text-6xl">
            Perguntas
            <br />
            <span className="bg-[linear-gradient(transparent_62%,var(--nv-lilas-forte)_62%)]">frequentes</span>
          </h2>
          <p className="mt-6 max-w-sm text-xl text-[var(--nv-texto)]">
            Ficou alguma dúvida que não está aqui? A gente responde no WhatsApp, com gente de verdade do outro lado.
          </p>
          <Cta size="lg" className="mt-8" local="faq">
            Falar com a gente
          </Cta>
        </div>
        <div className="border-t border-[var(--nv-linha)]">
          {faq.map((item, i) => {
            const on = open === i;
            return (
              <div key={item.question} className="border-b border-[var(--nv-linha)]">
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-5 text-left text-xl font-medium transition-colors sm:px-5",
                    on ? "mt-2 bg-[var(--nv-lilas)]" : "hover:bg-white",
                  )}
                >
                  {item.question}
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full",
                      on ? "bg-[var(--nv-roxo)] text-white" : "bg-[var(--nv-lilas)] text-[var(--nv-roxo)]",
                    )}
                  >
                    {on ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                {on ? (
                  <p className="px-4 pt-3 pb-6 text-xl leading-relaxed text-[var(--nv-texto)] sm:px-5">{item.answer}</p>
                ) : null}
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
          <p className="mt-6 text-xl text-[var(--nv-texto)]">
            Resposta pelo WhatsApp. Demonstração sem compromisso.
          </p>
        </div>
        <FeedbackCard compact className="absolute -top-20 -left-24 z-20 hidden rotate-[-4deg] xl:block" />
        <ReactionsCard className="absolute -right-24 -bottom-14 z-20 hidden w-80 rotate-[3deg] xl:block" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-28 sm:pb-10">
      <div className="mx-auto flex max-w-[1350px] flex-col items-center justify-between gap-5 rounded-3xl border border-[var(--nv-tinta)]/15 bg-white px-6 py-6 sm:flex-row sm:px-8">
        <div className="flex items-center gap-4">
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
        <span className="flex h-10 items-center gap-1 rounded-full bg-[var(--nv-laranja)] px-4 text-base font-semibold">
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

