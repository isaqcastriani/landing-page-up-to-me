import backgroundLandingPage from "@/assets/background-landing-page.webp";
import logotipoUptome from "@/assets/logotipo-uptome-branco.png";
import { Button } from "@/components/ui/button";
import { FaqItem, FaqList } from "@/components/landing/FaqItem";
import { Nr1Section } from "@/components/landing/Nr1Section";
import { PainCards } from "@/components/landing/PainCards";
import { StepsSection } from "@/components/landing/StepsSection";
import { ValueCards } from "@/components/landing/ValueCards";
import {
  clients,
  faqItems,
  QUIZ_LINK,
  solvesList,
} from "@/lib/landing-data";
import { Container, Eyebrow, Lede, Microcopy, Section, SectionHeading } from "./layout";

const btnClass = "h-auto rounded-[10px] px-7 py-4 text-base font-bold";

export function LandingPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center bg-no-repeat text-foreground antialiased"
      style={{ backgroundImage: `url(${backgroundLandingPage})` }}
    >
      <section
        id="hero"
        className="scroll-mt-8 pb-[88px] pt-12 md:flex md:min-h-[650px] md:items-center md:pt-16"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[7fr_3fr] lg:gap-8">
            <div>
              <span className="mb-[26px] inline-block rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 font-body text-xs font-medium tracking-wide text-accent-text">
                FEITO PARA QUEM LIDERA O RH
              </span>
              <h1 className="mb-[22px] font-display text-[clamp(2rem,5vw,3.25rem)] font-bold uppercase leading-[1.05] tracking-[0.3px]">
                O processo de feedback
                <br />
                você já tem.
                <br />
                <span className="mt-2 inline-block rounded-md bg-primary px-3 py-1.5 text-primary-foreground">
                  O que falta é o líder executar
                </span>
              </h1>
              <Lede>
                A UPtoME é a IA que treina o líder no momento em que ele mais precisa — por áudio, no
                celular, no meio do trabalho. Sem plataforma pesada, sem depender de ninguém lembrar de
                usar.
              </Lede>
              <div className="mt-[34px] flex flex-wrap items-center gap-[18px]">
                <Button asChild size="lg" className={btnClass}>
                  <a href={QUIZ_LINK}>Fazer diagnóstico gratuito</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className={`${btnClass} border-border bg-transparent text-foreground hover:bg-card hover:text-foreground`}
                >
                  <a href="#nr1">Ver o que muda com a NR-1 →</a>
                </Button>
              </div>
              <Microcopy>Leva 3 minutos · sem cadastro de cartão · sem compromisso</Microcopy>
            </div>

            <div className="flex items-center justify-center">
              <img
                src={logotipoUptome}
                alt="UPtoME"
                className="h-20 w-auto md:h-28 lg:h-32"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section id="dor">
        <Eyebrow>O DIAGNÓSTICO</Eyebrow>
        <SectionHeading>
          Você não está perdendo o controle.
          <br />
          Está perdendo a execução.
        </SectionHeading>
        <Lede>
          Você monta o processo de feedback. Escreve a política. Treina o líder. E, mesmo assim, no
          dia a dia, nada disso acontece.
        </Lede>

        <PainCards />

        <p className="mt-10 w-full text-[17px] text-muted-foreground">
          Nada disso é falha do RH. É que o feedback formal — ciclo anual, formulário, plataforma
          tradicional — não acontece no momento em que o problema está acontecendo. E é exatamente aí
          que ele precisava acontecer.
        </p>
      </Section>

      <Nr1Section />

      <Section id="solucao">
        <Eyebrow>A SOLUÇÃO</Eyebrow>
        <SectionHeading>A UPtoME treina o líder na hora — não depois, num relatório.</SectionHeading>
        <Lede>
          &ldquo;Os outros medem, registram e mandam relatório. A UPtoME desenvolve o líder na hora
          — feedback dinâmico que vira ação, sem burocracia, por áudio e no celular.&rdquo;
        </Lede>

        <ValueCards />

        <div className="mt-14 rounded-[10px] border border-border bg-card p-8">
          <h3 className="mb-[18px] font-display text-lg font-semibold text-foreground">
            O que isso resolve, na prática, para o RH:
          </h3>
          <ul className="grid gap-3.5">
            {solvesList.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] text-muted-foreground">
                <span className="shrink-0 font-bold text-accent-text" aria-hidden>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <StepsSection />

      <Section id="prova-social">
        <div className="text-center">
          <Eyebrow center>QUEM JÁ USA</Eyebrow>
          <SectionHeading className="mx-auto">
            Empresas desenvolvendo liderança em tempo real com a UPtoME
          </SectionHeading>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {clients.map((client) => (
              <img
                key={client.name}
                src={client.logo}
                alt={client.name}
                className="h-16 w-auto max-w-[260px] object-contain opacity-80 brightness-0 invert transition-[filter,opacity] duration-300 hover:opacity-100 hover:brightness-100 hover:invert-0 md:h-20"
              />
            ))}
          </div>
        </div>
      </Section>

      <section className="scroll-mt-8 py-16 md:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-primary-foreground/40 bg-gradient-to-br from-[#1a1428] via-[#0f1118] to-[#0a0c10] px-8 py-14 shadow-[0_0_24px_rgba(243,245,247,0.12),inset_0_0_0_1px_rgba(243,245,247,0.08)] md:px-16 md:py-20">
            <div
              className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full bg-primary/50 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-40 -left-20 size-[22rem] rounded-full border border-primary-foreground/15"
              aria-hidden
            />
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <SectionHeading className="mb-0 text-left text-[clamp(1.875rem,4vw,2.875rem)]">
                Seu processo de feedback já existe.
                <br />
                Falta só o líder executar.
              </SectionHeading>
              <div className="text-left">
                <Lede>
                  Descubra em 3 minutos onde está o maior risco de liderança da sua empresa — antes
                  que ele vire demissão, turnover ou uma não conformidade na fiscalização da NR-1.
                </Lede>
                <Button asChild size="lg" className={`mt-6 ${btnClass}`}>
                  <a href={QUIZ_LINK}>Fazer diagnóstico gratuito agora</a>
                </Button>
                <Microcopy>8 perguntas · 3 minutos · sem compromisso</Microcopy>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section id="faq">
        <Eyebrow>PERGUNTAS FREQUENTES</Eyebrow>
        <SectionHeading className="mb-9">Ainda com dúvidas?</SectionHeading>

        <FaqList>
          {faqItems.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </FaqList>
      </Section>

      <footer className="border-t border-border/60 py-10">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <img src={logotipoUptome} alt="UPtoME" className="h-12 w-auto" />
          <small className="font-body text-xs text-dim">
            © 2026 UPtoME — Liderança em tempo real ·{" "}
            <a href="/" className="underline-offset-2 hover:underline">
              Versão principal
            </a>
          </small>
        </Container>
      </footer>
    </div>
  );
}
