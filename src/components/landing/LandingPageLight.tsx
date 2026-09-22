import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  ClipboardList,
  Menu,
  Mic,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import backgroundCta from "@/assets/background-secao-cta.png";
import backgroundCardRoxo from "@/assets/background-card-roxo.png";
import backgroundLanding from "@/assets/background-landing-page-2.webp";
import backgroundHero from "@/assets/background-hero-section.png";
import backgroundHeroMobile from "@/assets/background-hero-section-mobile.png";
import logotipoV4 from "@/assets/logotipo-v4-branco.png";
import logotipoUptome from "@/assets/logotipo-uptome.png";
import logotipoUptomeBranco from "@/assets/logotipo-uptome-branco.png";
import { clients } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

const FORM_HREF = "#contato";

const nav = [
  { href: "#dor", label: "A dor" },
  { href: "#solucao", label: "Solução" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#contato", label: "Contato" },
  { href: "#faq", label: "FAQ" },
] as const;

const painCards = [
  {
    tag: "01 · TEMPO",
    title: "PDI que come o seu final de semana",
    description: "Planilha, meta por meta, pra cada pessoa do time — de novo a cada ciclo.",
  },
  {
    tag: "02 · EXECUÇÃO",
    title: "O líder não aplica o que aprendeu",
    description:
      "Você explica, treina, cobra — e a conversa com o funcionário simplesmente não acontece.",
  },
  {
    tag: "03 · GENÉRICO",
    title: "PDI que sai igual pra todo mundo",
    description: "Sem tempo de pensar um por um, o plano de desenvolvimento vira modelo copiado.",
  },
  {
    tag: "04 · REGISTRO",
    title: "Reunião de alinhamento que não vira nada",
    description: "A conversa aconteceu, mas não virou histórico, meta ou próximo passo.",
  },
] as const;

const valueCards = [
  {
    num: "01",
    title: "PDI automático",
    description:
      "Construído a partir da reunião de alinhamento que você já teve — sem pensar em cada meta do zero.",
  },
  {
    num: "02",
    title: "Avaliação de desempenho junto",
    description: "PDI e avaliação prontos ao mesmo tempo, sem duplicar trabalho.",
  },
  {
    num: "03",
    title: "Comunicação eficiente por áudio",
    description: "O líder grava um áudio livre, mesmo num dia ruim, e a IA organiza numa devolutiva clara.",
  },
  {
    num: "04",
    title: "Sem perder humanização",
    description: "Metas e planos individuais — não modelo genérico copiado de um pro outro.",
  },
] as const;

const steps = [
  {
    title: "Preencha o formulário",
    description: "Nome, empresa, WhatsApp, cargo e número de funcionários. Menos de 1 minuto.",
  },
  {
    title: "A gente te chama no WhatsApp",
    description: "Um especialista entra em contato direto pra entender sua realidade.",
  },
  {
    title: "Veja a ferramenta na prática",
    description: "Demonstração real de como o PDI e a avaliação de desempenho saem prontos.",
  },
] as const;

const afterSubmit = [
  "Um especialista entra em contato pelo WhatsApp em até 1 dia útil.",
  "Você vê a ferramenta rodando na prática — PDI e avaliação de desempenho reais.",
  "Sem quiz, sem formulário longo, sem enrolação.",
] as const;

const headcountOptions = [
  "Até 20",
  "21 a 50",
  "51 a 100",
  "101 a 300",
  "301 a 500",
  "Mais de 500",
] as const;

const faqItems = [
  {
    question: "A UPtoME substitui o RH?",
    answer:
      "Não. A UPtoME tira o trabalho manual de quem já faz gestão de pessoas todos os dias. O RH continua no comando — a ferramenta monta o PDI e a avaliação de desempenho a partir da reunião de alinhamento.",
  },
  {
    question: "Quanto tempo leva pra implementar?",
    answer:
      "Não há projeto de implantação de meses. Depois da conversa no WhatsApp, você vê a ferramenta na prática — PDI e avaliação de desempenho prontos, sem meses de setup.",
  },
  {
    question: "Como funciona o áudio? É seguro?",
    answer:
      "O líder grava um áudio livre, mesmo num dia ruim, e a IA organiza numa devolutiva clara. Os dados são tratados com os padrões de segurança esperados de uma plataforma de gestão de pessoas.",
  },
  {
    question: "Quanto custa?",
    answer:
      "O investimento varia conforme o porte da empresa. Isso é alinhado na conversa com o especialista, no WhatsApp — sem letra miúda.",
  },
  {
    question: "Funciona pra qual porte de empresa?",
    answer:
      "Para empresas que já fazem gestão de pessoas no dia a dia e não querem perder o dia montando PDI e avaliação de desempenho na planilha.",
  },
] as const;

const featureIcons = [ClipboardList, ClipboardList, Mic, Users] as const;

function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-[1660px] px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <a href="#topo" className="inline-flex shrink-0" aria-label="UPtoME">
      <img
        src={onDark ? logotipoUptomeBranco : logotipoUptome}
        alt="UPtoME"
        className="h-10 w-auto sm:h-11"
      />
    </a>
  );
}

function ButtonBody({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <>
      <span
        className={cn(
          "pointer-events-none absolute -inset-[3px] rounded-full border border-[#FF7B30]",
          onDark && "border-[#7C3AED]",
        )}
        aria-hidden
      />
      <span
        className={cn(
          "relative flex min-h-12 w-full items-center rounded-full py-2 pr-4 pl-12 text-base font-bold tracking-tight text-white transition-all duration-500 ease-out group-hover:pr-12 group-hover:pl-4",
          onDark ? "bg-[#FF7B30] group-hover:bg-[#E8651A]" : "bg-[#7C3AED] group-hover:bg-[#6D28D9]",
          className,
        )}
      >
        {children}
      </span>
      <span
        className="absolute top-1/2 left-1.5 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white transition-[left] duration-500 ease-out group-hover:left-[calc(100%-2.65rem)]"
        aria-hidden
      >
        <ArrowUpRight className={cn("size-4", onDark ? "text-[#FF7B30]" : "text-[#7C3AED]")} />
      </span>
    </>
  );
}

function Cta({
  href,
  children,
  className,
  onDark = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7B30]/40",
        className,
      )}
    >
      <ButtonBody onDark={onDark}>{children}</ButtonBody>
    </a>
  );
}

function GhostCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group relative inline-flex">
      <ButtonBody onDark>{children}</ButtonBody>
    </a>
  );
}

function FaqRow({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-1">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-[17px] font-semibold"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {question}
        <span
          className={cn("text-2xl text-[#FF7B30] transition-transform duration-300 ease-out", open && "rotate-45")}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-base leading-relaxed text-[#5C5468]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-3 font-body text-base font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
      {children}
      <span className="h-px w-10 bg-[#7C3AED]" aria-hidden />
    </p>
  );
}

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const fieldClass =
    "mt-2 h-12 w-full shrink-0 rounded-xl border border-[#E6E6E4] bg-[#F7F7F5] px-4 text-base outline-none focus:border-[#7C3AED]";

  if (sent) {
    return (
      <div className="flex h-full min-h-[600px] w-full flex-col items-center justify-center p-6 text-center sm:p-8 lg:min-h-full lg:p-10">
        <p className="font-display text-2xl font-bold text-[#1A1224]">Recebemos.</p>
        <p className="mt-3 text-[#3D3348]">
          Um especialista te chama no WhatsApp em até 1 dia útil.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full min-h-[600px] w-full flex-col justify-center gap-5 p-6 sm:p-8 lg:min-h-full lg:p-10"
    >
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-base font-semibold tracking-[0.14em] text-[#7C3AED]">NOME</span>
          <input required name="nome" autoComplete="name" placeholder="Seu nome completo" className={fieldClass} />
        </label>
        <label className="flex flex-col">
          <span className="text-base font-semibold tracking-[0.14em] text-[#7C3AED]">EMPRESA</span>
          <input
            required
            name="empresa"
            autoComplete="organization"
            placeholder="Nome da empresa"
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-base font-semibold tracking-[0.14em] text-[#7C3AED]">WHATSAPP</span>
          <input
            required
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="(11) 90000-0000"
            value={whatsapp}
            onChange={(event) => setWhatsapp(formatWhatsapp(event.target.value))}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-base font-semibold tracking-[0.14em] text-[#7C3AED]">CARGO</span>
          <input
            required
            name="cargo"
            autoComplete="organization-title"
            placeholder="Ex.: Gerente de RH"
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col sm:col-span-2">
          <span className="text-base font-semibold tracking-[0.14em] text-[#7C3AED]">
            NÚMERO DE FUNCIONÁRIOS
          </span>
          <select required name="funcionarios" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Selecione uma faixa
            </option>
            {headcountOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="group relative mt-2 inline-flex cursor-pointer self-end">
        <ButtonBody>Quero falar com a UPtoME</ButtonBody>
      </button>
      <p className="text-center text-base text-[#6B6276]">
        Seus dados só são usados pra esse contato — sem spam.
      </p>
    </form>
  );
}

export function LandingPageLight() {
  const [open, setOpen] = useState(false);

  return (
    <div
      id="topo"
      className="min-h-screen bg-[#F7F7F5] bg-cover bg-center bg-fixed text-[#1A1224] antialiased"
      style={{ backgroundImage: `url(${backgroundLanding})` }}
    >
      <header className="sticky top-0 z-40 border-b border-[#E6E6E4] bg-[#F7F7F5]/90 backdrop-blur-md">
        <Section className="flex h-[76px] items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium text-[#3D3348] transition hover:text-[#7C3AED]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Cta href={FORM_HREF} className="hidden text-base sm:inline-flex">
              Falar com a gente
            </Cta>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-[#E6E6E4] lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Section>
        {open && (
          <Section className="border-t border-[#E6E6E4] py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-1 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Cta href={FORM_HREF} className="mt-2 w-full">
                Falar com a gente
              </Cta>
            </div>
          </Section>
        )}
      </header>

      <section className="relative flex min-h-[1000px] overflow-hidden rounded-b-[40px] bg-[#F7F7F5] pb-16 pt-12 md:min-h-[640px] md:rounded-b-[56px] md:pb-24 md:pt-16">
        <img
          src={backgroundHeroMobile}
          alt=""
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        />
        <img
          src={backgroundHero}
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />
        <Section className="relative flex flex-1 items-center">
          <div className="max-w-[640px]">
            <Eyebrow>Feito para quem lidera o RH</Eyebrow>
            <h1 className="font-display text-[clamp(2.3rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1A1224]">
              PDI pronto. Avaliação de desempenho pronta.
              <span className="mt-1 block text-[#6D28D9]">Sem você perder o dia com isso.</span>
            </h1>
            <p className="mt-5 max-w-[540px] text-lg leading-relaxed text-[#5C5468]">
              A UPtoME não é uma plataforma de ensino — é gestão de pessoas na prática. Ela monta o
              PDI e a avaliação de desempenho de cada pessoa a partir da reunião de alinhamento que
              você já teve. Sem modelo genérico, sem começar do zero.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Cta href={FORM_HREF}>Preencher formulário e falar com a gente</Cta>
              <GhostCta href="#como-funciona">Ver como funciona</GhostCta>
            </div>
            <p className="mt-4 max-w-[480px] text-base text-[#6B6276]">
              Sem quiz, sem diagnóstico longo — é só preencher e um especialista te chama no WhatsApp
            </p>
          </div>
        </Section>
      </section>

      <section id="dor" className="scroll-mt-24 py-16 md:py-24">
        <Section>
          <Eyebrow>O diagnóstico</Eyebrow>
          <h2 className="max-w-[760px] font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.03em]">
            Você faz o PDI. Treina o líder pra aplicar.{" "}
            <span className="text-[#6D28D9]">E mesmo assim, ele não faz.</span>
          </h2>
          <p className="mt-4 max-w-[680px] text-lg text-[#5C5468]">
            Não é falta de processo. É que o processo depende do líder lembrar, ter tempo e estar no
            dia certo pra aplicar — e isso nem sempre acontece.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {painCards.map((card) => (
              <article
                key={card.tag}
                className="rounded-[22px] bg-[#4C1D95] px-6 py-10"
              >
                <p className="mb-2 text-base font-semibold tracking-[0.14em] text-[#FF7B30]">{card.tag}</p>
                <h3 className="font-display text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-base text-white/80">{card.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-[820px] text-[17px] leading-relaxed text-[#5C5468]">
            A UPtoME tira essa dependência: o que importa não é o líder &ldquo;dar conta&rdquo; — é a
            reunião de alinhamento que já aconteceu virar PDI e avaliação de desempenho sozinha.
          </p>
        </Section>
      </section>

      <section id="solucao" className="scroll-mt-24 py-16 md:py-24">
        <Section>
          <Eyebrow>A solução</Eyebrow>
          <h2 className="max-w-[760px] font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.03em]">
            Gestão de pessoas com praticidade.{" "}
            <span className="text-[#6D28D9]">não mais uma plataforma de ensino.</span>
          </h2>
          <p className="mt-4 max-w-[640px] text-lg text-[#5C5468]">
            A UPtoME não treina ninguém. Ela tira o trabalho manual de quem já faz gestão de pessoas
            todos os dias.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valueCards.map((card, index) => {
              const Icon = featureIcons[index] ?? Sparkles;
              return (
                <article key={card.num} className="rounded-[22px] border border-[#E6E6E4] bg-[#F7F7F5] p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-[#FFF1E8] text-[#FF7B30]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-display text-base font-semibold text-[#FF7B30]">{card.num}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#6D28D9]">{card.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-[#5C5468]">{card.description}</p>
                </article>
              );
            })}
          </div>
        </Section>
      </section>

      <section id="como-funciona" className="scroll-mt-24 py-16 md:py-24">
        <Section>
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="max-w-[680px] font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.03em]">
            Sem quiz, sem diagnóstico longo. <span className="text-[#6D28D9]">Só três passos.</span>
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="flex min-h-[220px] flex-col rounded-[22px] bg-cover bg-right p-6"
                style={{ backgroundImage: `url(${backgroundCardRoxo})` }}
              >
                <span className="flex size-24 items-center justify-center rounded-full bg-[#F3EEFF] font-display text-4xl font-bold text-[#6D28D9]">
                  {index + 1}
                </span>
                <div className="mt-auto pt-8">
                  <h3 className="font-display text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/80">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </section>

      <section id="contato" className="scroll-mt-24 py-16 md:py-24">
        <Section>
          <div className="grid min-h-[600px] overflow-hidden rounded-[28px] lg:grid-cols-2 lg:items-stretch">
            <div className="flex flex-col justify-center bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] p-8 md:p-12">
              <p className="mb-4 inline-flex items-center gap-3 font-body text-base font-semibold uppercase tracking-[0.16em] text-white">
                Fale com a gente
                <span className="h-px w-10 bg-white/70" aria-hidden />
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white/80">
                Preencha e <span className="text-white">um especialista te chama no WhatsApp</span>
              </h2>
              <p className="mt-5 font-display text-lg font-semibold text-white">
                O que acontece depois que você envia:
              </p>
              <ul className="mt-4 space-y-3">
                {afterSubmit.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-white/90">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#FF7B30] text-white">
                      <Check className="size-4" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex h-full min-h-[600px] w-full bg-[#E0D4F7] lg:min-h-full">
              <ContactForm />
            </div>
          </div>
        </Section>
      </section>

      <section className="py-16 md:py-20">
        <Section className="text-center">
          <Eyebrow>Quem já usa</Eyebrow>
          <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold tracking-[-0.03em]">
            Empresas que já tiram o <span className="text-[#6D28D9]">PDI da planilha</span> com a UPtoME
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {clients.map((client) => (
              <img
                key={client.name}
                src={client.logo}
                alt={client.name}
                className="h-14 w-auto max-w-[220px] object-contain md:h-16"
              />
            ))}
          </div>
        </Section>
      </section>

      <section className="pb-16 md:pb-24">
        <Section>
          <div
            className="flex min-h-[600px] items-center overflow-hidden rounded-[28px] bg-[#4C1D95] bg-cover bg-left px-8 py-10 md:px-16 lg:px-24"
            style={{ backgroundImage: `url(${backgroundCta})` }}
          >
            <div className="flex w-full max-w-[520px] flex-col items-start text-left">
              <p className="mb-3 text-base font-semibold uppercase tracking-[0.16em] text-white/80">
                Última chamada
              </p>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-bold leading-tight text-white/80">
                PDI e avaliação de desempenho prontos.{" "}
                <span className="text-white">Sem você perder o dia com isso.</span>
              </h2>
              <p className="mt-3 text-white/85">
                Preencha o formulário e fale com a gente no WhatsApp — sem quiz, sem enrolação.
              </p>
              <Cta href={FORM_HREF} onDark className="mt-8 shrink-0">
                Preencher formulário agora
              </Cta>
            </div>
          </div>
        </Section>
      </section>

      <section id="faq" className="scroll-mt-24 pb-16 md:pb-24">
        <Section className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Perguntas frequentes</Eyebrow>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold tracking-[-0.03em]">
              Ainda com <span className="text-[#6D28D9]">dúvidas?</span>
            </h2>
          </div>
          <div className="divide-y divide-[#E6E6E4] border-y border-[#E6E6E4]">
            {faqItems.map((item) => (
              <FaqRow key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </Section>
      </section>

      <footer className="bg-gradient-to-r from-[#6D28D9] to-[#5B21B6] py-10">
        <Section className="flex flex-wrap items-center justify-between gap-4">
          <Logo onDark />
          <span className="text-base text-white/80">© 2026 UPtoME — Gestão de pessoas com praticidade</span>
        </Section>
        <p className="mt-6 flex items-center justify-center gap-2 text-base text-white/50">
          Desenvolvido por
          <img src={logotipoV4} alt="V4" className="h-4 w-auto" />
        </p>
      </footer>
    </div>
  );
}
