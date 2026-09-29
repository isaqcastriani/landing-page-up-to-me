// Copy da LP nova (/). Regras do briefing que valem para tudo aqui:
// sem travessão, sem promessa em percentual, sem "garante NR-1", sem logo
// ou depoimento de cliente até a Paula autorizar.

export const nav = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#plataforma", label: "Plataforma + RH" },
  { href: "#duvidas", label: "Dúvidas" },
] as const;

export const pains = [
  {
    title: "Você treinou o líder e nada mudou",
    description: "A empresa investe, o líder sai animado da sala e na primeira conversa difícil volta ao jeito antigo.",
  },
  {
    title: "O feedback fica no papel, no WhatsApp ou em lugar nenhum",
    description: "Quando precisa de histórico, ninguém acha. Quando acha, é um print que ninguém queria ver.",
  },
  {
    title: "O melhor técnico virou o líder que dá bronca na frente de todo mundo",
    description: "Foi promovido porque era bom no que fazia. Ninguém ensinou a parte de falar com gente.",
  },
] as const;

export const features = [
  {
    key: "audio",
    title: "Feedback por áudio ou texto",
    lead: "Fala do jeito que falaria.",
    description:
      " A IA reescreve em quatro partes: o que aconteceu, o impacto, o que se espera e uma pergunta pra resolver junto.",
    tone: "claro",
  },
  {
    key: "feedback-do-feedback",
    title: "O feedback do feedback",
    lead: "É aqui que o líder aprende.",
    description:
      " Quem enviou vê o que a IA tirou e por quê: julgamento, tom de ordem, elogio vazio. Quanto mais usa, melhor fala.",
    tone: "escuro",
  },
  {
    key: "perfil",
    title: "O manual de cada pessoa",
    lead: "15 perguntas no cadastro.",
    description:
      " Viram um perfil prático: como falar com ela, como delegar, palavras que funcionam e palavras pra evitar.",
    tone: "claro",
  },
  {
    key: "acao",
    title: "Vira ação e fica registrado",
    lead: "Nada de conversa que some.",
    description:
      " Quem recebe escolhe o próximo passo. Tudo fica com autor, data e histórico, pronto pro RH acompanhar.",
    tone: "escuro",
  },
] as const;

export const steps = [
  {
    title: "Cada pessoa entra pelo celular",
    description:
      "Com e-mail ou só com o número de telefone. Quem é de loja, obra ou operação também entra.",
  },
  {
    title: "O líder registra do jeito dele",
    description: "Texto corrido ou áudio no meio do corredor. Não precisa pensar em estrutura.",
  },
  {
    title: "A IA ajusta pra quem vai receber",
    description:
      "Considera o perfil da pessoa, a hierarquia e o histórico. Fala-se diferente com chefe, par ou liderado.",
  },
  {
    title: "Vira ação e histórico",
    description:
      "A pessoa reage, cria o plano de ação e o RH vê tudo por líder, área e período.",
  },
] as const;

// Exemplos ilustrativos de como a IA reescreve. Não são depoimentos.
export const beforeAfter = [
  {
    tema: "Atraso",
    antes: "De novo atrasado?? Assim não dá, você nunca leva nada a sério.",
    riscado: ["nunca leva nada a sério"],
    depois:
      "Nas últimas duas semanas você chegou depois das 9h em quatro dias. A abertura da loja ficou com uma pessoa só. Precisamos da equipe completa às 9h. O que podemos ajustar na sua rotina pra isso acontecer?",
  },
  {
    tema: "Conflito entre colegas",
    antes: "Para de ficar mandando no Rafael, você não é chefe dele.",
    riscado: ["você não é chefe dele"],
    depois:
      "Na reunião de ontem, as tarefas do Rafael foram redistribuídas sem conversa com ele. Ele ficou sem saber o que priorizar. O combinado é que cada um organize a própria fila. Como podemos alinhar isso entre vocês dois?",
  },
  {
    tema: "Elogio vazio",
    antes: "Mandou bem, top demais!!",
    riscado: ["top demais"],
    depois:
      "Você resolveu a reclamação da cliente em menos de uma hora e ela voltou pra comprar. Isso segurou uma venda e a imagem da loja. Quero que esse jeito de atender vire padrão. O que podemos fazer pra ensinar isso pro time?",
  },
  {
    tema: "Meta",
    antes: "Mais um mês sem bater meta. Tá difícil contar com você.",
    riscado: ["Tá difícil contar com você"],
    depois:
      "A meta de agosto fechou em 70 atendimentos e a combinada era 90. Isso pesa no resultado da equipe inteira. Precisamos voltar ao combinado em setembro. O que está travando e como podemos resolver juntos?",
  },
] as const;

export const audiences = [
  {
    title: "Pra quem é dono",
    lead: "Se você assina o cheque...",
    description:
      "Meta batida no prazo, menos gente boa pedindo pra sair e histórico documentado quando uma demissão for inevitável.",
    tone: "claro",
  },
  {
    title: "Pra quem é do RH",
    lead: "Se você defende a compra...",
    description:
      "Feedback, PDI e avaliação num lugar só, dados pra levar à diretoria e o fim da planilha no fim de semana.",
    tone: "escuro",
  },
] as const;

export const signals = [
  "Tem líder promovido sem preparo",
  "O feedback é no papel ou no WhatsApp",
  "Tem gente sem e-mail corporativo",
  "Já perdeu alguém bom por causa da liderança",
  "Faz avaliação uma vez por ano e esquece",
] as const;

export const marquee = [
  "Feedback por áudio",
  "Sem anonimato",
  "Login pelo celular",
  "PDI pela IA",
  "Perfil comportamental",
  "Conversa difícil sem briga",
  "Relatórios pro RH",
  "Convive com seu sistema",
] as const;

export const platform = [
  "Feedback com IA, por texto ou áudio",
  "Rascunho de conversa difícil",
  "Perfil comportamental de cada pessoa",
  "PDI gerado pela IA",
  "Avaliação de desempenho",
  "Relatórios por líder, área e período",
  "Várias empresas numa conta só",
] as const;

export const consultancy = [
  {
    strong: "Implantação",
    text: "feita por quem passou anos treinando liderança, não por um manual de 40 páginas",
  },
  {
    strong: "Acompanhamento",
    text: "de gente de RH, pra ferramenta virar hábito e não mais um login esquecido",
  },
  {
    strong: "Na mesma semana",
    text: "sem projeto de implantação de meses",
  },
] as const;

export const coexist = [
  {
    title: "Sistema de RH e folha",
    description: "A UPtoME não faz departamento pessoal. Admissão, folha e benefícios continuam onde estão.",
    tag: "Sem troca",
  },
  {
    title: "Ponto e escalas",
    description: "Nada muda na rotina de ponto. A gente cuida da conversa entre líder e equipe.",
    tag: "Sem migração",
  },
  {
    title: "API aberta",
    description: "Nascemos prontos pra integrar com o que a sua empresa já usa.",
    tag: "Integra",
  },
] as const;

// O que cada reação faz, na seção "depois do feedback".
export const reactionSteps = [
  { reaction: "Foco no objetivo", description: "Entendeu o recado e segue no que foi combinado.", note: "Registrado no histórico" },
  {
    reaction: "Vou criar o plano de ação",
    description: "Abre um plano que entra no quadro de acompanhamento do líder e do RH.",
    note: "Plano de ação criado",
  },
  {
    reaction: "Bora alinhar melhor",
    description: "Pede uma conversa ao vivo. A ferramenta abre a porta, a conversa é entre pessoas.",
    note: "Conversa ao vivo marcada",
  },
  { reaction: "Agradeço de verdade", description: "Fecha o ciclo com reconhecimento.", note: "Reconhecimento registrado" },
] as const;

export const collaboratorRanges = ["Até 10", "11 a 20", "21 a 50", "51 a 100", "101 a 300", "Mais de 300"] as const;

export const faq = [
  {
    question: "Preciso trocar o sistema de RH que eu já uso?",
    answer:
      "Não. A UPtoME entra do lado do que você já tem. Ela não faz folha, ponto nem benefícios. Cuida da conversa entre líder e equipe e do registro disso.",
  },
  {
    question: "Meu líder não tem tempo. Vai usar mesmo?",
    answer:
      "Foi pensado pra isso. Ele manda um áudio pelo celular, do jeito que falaria, e a IA organiza. Não tem formulário pra preencher.",
  },
  {
    question: "A IA escreve o feedback no lugar do líder?",
    answer:
      "Ela ajusta o que o líder disse, pensando em quem vai receber. E mostra pra ele o que mudou e por quê. Com o uso, o próprio líder passa a falar melhor.",
  },
  {
    question: "E quem não tem e-mail corporativo?",
    answer:
      "Entra com o número de telefone e um código por SMS. Tem também um modo de linguagem simplificada que a própria pessoa liga ou desliga.",
  },
  {
    question: "Dá pra mandar feedback anônimo?",
    answer:
      "Não, e é de propósito. Todo feedback tem autor, data e registro. Isso protege quem recebe, quem envia e a empresa.",
  },
  {
    question: "Quanto tempo leva pra começar?",
    answer:
      "Não existe projeto de implantação de meses. A equipe de RH da UPtoME faz a implantação com você e o time começa a usar na mesma semana.",
  },
  {
    question: "Ajuda com a NR-1?",
    answer:
      "O registro de feedback e o plano de ação ajudam a documentar o acompanhamento de riscos psicossociais. A UPtoME complementa o seu programa de gerenciamento de riscos, não substitui.",
  },
  {
    question: "Quanto custa?",
    answer:
      "Depende do número de pessoas e de quanto acompanhamento de RH faz sentido pra você. A gente fecha isso na conversa, depois de entender o seu time.",
  },
] as const;
