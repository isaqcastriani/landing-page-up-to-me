import logoGrupoCesari from "@/assets/clients/grupo-cesari.png";
import logoImpactareSeguros from "@/assets/clients/impactare-seguros.png";
import logoVibesEngenharia from "@/assets/clients/vibes-engenharia.png";

export const QUIZ_LINK = "#TODO-LINK-QUIZ";

export const painCards = [
  {
    tag: "01 · DEMISSÃO",
    title: "Demissão que pega todo mundo de surpresa",
    description: "Porque o problema nunca foi conversado a tempo.",
  },
  {
    tag: "02 · TURNOVER",
    title: "Turnover que ninguém consegue explicar",
    description: "Porque a causa real nunca chega até você, só o resultado.",
  },
  {
    tag: "03 · DESALINHAMENTO",
    title: "Líder e liderado desalinhados",
    description: "Um acha que está tudo bem, o outro já está procurando outra vaga.",
  },
  {
    tag: "04 · EXECUÇÃO",
    title: "O processo vira só um documento",
    description: "Porque exigir que o líder use a plataforma virou mais um trabalho seu.",
  },
] as const;

export const nr1Timeline: Array<{
  date: string;
  description: string;
  highlight: string;
  strong?: boolean;
}> = [
  {
    date: "AGO / 2024",
    description:
      "Portaria MTE nº 1.419 atualiza a NR-1 e inclui riscos psicossociais no escopo da norma.",
    highlight: "riscos psicossociais",
  },
  {
    date: "MAIO / 2025",
    description:
      "Norma entra em vigor: carga de trabalho, comportamento de liderança, relações interpessoais e pressão excessiva passam a precisar constar no GRO e no PGR.",
    highlight: "comportamento de liderança",
  },
  {
    date: "26 MAIO / 2026",
    description: "Início da fiscalização com aplicação de multas. O Ministério do Trabalho confirmou que não haverá nova prorrogação.",
    highlight: "Início da fiscalização com aplicação de multas.",
    strong: true,
  },
];

export const statCallouts = [
  {
    value: "R$ 1.700–5.200",
    description:
      "por infração, seguindo a tabela da NR-28 — e some rápido quando há mais de um problema na mesma fiscalização.",
  },
  {
    value: "R$ 15–20 mil+",
    description:
      "numa única visita, quando faltam inventário de risco, plano de ação e treinamento ao mesmo tempo. Escala com o porte da empresa.",
  },
] as const;

export const valueCards = [
  {
    num: "01",
    title: "Treino em tempo real",
    description: "Nenhuma outra plataforma treina o líder no momento em que ele está liderando.",
  },
  {
    num: "02",
    title: "Feedback por áudio",
    description: "Zero concorrentes oferecem isso. Sem fricção de sentar pra escrever.",
  },
  {
    num: "03",
    title: "Zero burocracia",
    description: "Sem implantação de meses, sem manual de 40 páginas.",
  },
  {
    num: "04",
    title: "Desacoplado do ciclo formal",
    description: "Acontece no fluxo real do trabalho, não preso ao ciclo anual.",
  },
] as const;

export const solvesList = [
  "O processo que você criou passa a ser executado — porque fica fácil de usar, não porque você cobra.",
  "Menos demissões-surpresa: o desalinhamento é tratado antes de virar pedido de desligamento.",
  "Menos turnover não explicado, com visibilidade real do que acontece entre líder e time.",
  "Um argumento concreto de cultura preventiva diante da fiscalização da NR-1.",
] as const;

export const steps = [
  {
    title: "Diagnóstico\n(3 min)",
    description:
      "Responda 8 perguntas sobre a maturidade de liderança e feedback da sua empresa hoje.",
  },
  {
    title: "Resultado imediato",
    description: "Veja onde estão os maiores riscos: turnover, desalinhamento, ausência de feedback.",
  },
  {
    title: "Sessão de diagnóstico",
    description: "Um especialista mostra como a IA se aplicaria à sua operação.",
  },
  {
    title: "Ativação sem burocracia",
    description: "Líderes começam a usar por áudio, no celular, sem curva de implantação longa.",
  },
] as const;

export const clients = [
  { name: "Grupo Cesari", logo: logoGrupoCesari },
  { name: "Vibes Engenharia", logo: logoVibesEngenharia },
  { name: "Impactare Seguros", logo: logoImpactareSeguros },
] as const;

export const faqItems = [
  {
    question: "A UPtoME substitui o RH?",
    answer:
      "Não. A UPtoME dá ao líder a ferramenta para executar o que o RH já planejou. O RH continua estruturando processo, cultura e política — a IA garante que isso aconteça na prática, sem precisar de cobrança constante.",
  },
  {
    question: "Quanto tempo leva para implementar?",
    answer:
      "Diferente de plataformas tradicionais de RH, não há projeto de implantação de meses. Depois da sessão de diagnóstico, os líderes começam a usar em dias, não em trimestres.",
  },
  {
    question: "Como funciona o feedback por áudio? É seguro?",
    answer:
      "O líder registra o feedback por áudio, direto no celular, no momento em que a situação acontece. Os dados são tratados com os padrões de segurança esperados de uma plataforma de gestão de pessoas — requisitos específicos de segurança da informação são detalhados na sessão de diagnóstico.",
  },
  {
    question: "A UPtoME resolve a exigência da NR-1 sozinha?",
    answer:
      "Não. A NR-1 exige inventário de riscos, PGR e laudo técnico formal, que continuam sendo responsabilidade do SESMT ou consultoria especializada. A UPtoME atua na parte comportamental do dia a dia — desenvolvendo lideranças que não geram, elas mesmas, risco psicossocial para o time.",
  },
  {
    question: "Quanto custa?",
    answer:
      "O investimento varia conforme o número de líderes e o porte da operação. Isso é detalhado na sessão de diagnóstico, depois de entendermos sua realidade — sem letra miúda.",
  },
  {
    question: "Funciona para qual porte de empresa?",
    answer:
      "A UPtoME foi desenhada para empresas de 50 a 300 colaboradores, com times de liderança que têm pouco tempo para processos burocráticos — o feedback por áudio, direto no fluxo do trabalho, faz toda diferença nesse cenário.",
  },
] as const;
