# UPtoME: briefing para o site institucional e a landing page

Versão de 22-09-2026 · preparado por Victor Ribeiro (V4 Company, gerente da conta)

Este documento junta o que a gente sabe sobre a UPtoME depois de cerca de 17 reuniões com as sócias, uma pesquisa de concorrência, duas landing pages de teste, um quiz de diagnóstico e alguns meses de campanha. A ideia é você não precisar de outra reunião para entender o negócio. O que ainda está em aberto aparece marcado como pendência, e a lista completa está na seção 14.

---

## 1. O que você vai entregar

São duas peças.

A primeira é o site institucional. Hoje o domínio `uptome.com.br` mostra uma página única feita no GreatPages, não está indexada no Google e, em alguns momentos, redirecionou direto para a tela de login do app. A Paula (sócia) já disse que "o site é uma coisa e o login leva ao produto" e que "a gente precisa ter informação ali". Ela quer sair do GreatPages e hospedar o site no domínio próprio, construído em código (a última LP foi feita em Lovable e publicada no domínio da UPtoME).

A segunda é uma landing page de captura para as campanhas pagas (Meta Ads e Google Search). Ela fala com RH, T&D e donos de empresas pequenas, e o objetivo único é gerar contato qualificado, com a conversa indo para o WhatsApp.

As duas precisam parecer da mesma marca e do mesmo produto, que acabou de ganhar uma versão nova já na identidade atual.

---

## 2. A empresa

A UPtoME é um SaaS brasileiro de desenvolvimento de pessoas centrado em feedback. O líder registra o feedback do jeito que conseguir (texto ou áudio, pelo celular), e a inteligência artificial transforma aquilo numa conversa bem estruturada, adaptada a quem vai receber. Com o uso, o próprio líder aprende a se comunicar melhor.

A empresa nasceu de consultoras de RH que passaram anos em desenvolvimento humano, treinamento de liderança e coaching. Elas viam sempre o mesmo problema: a empresa investe em treinamento de liderança, o treinamento acaba e o líder volta a não saber o que fazer. Chamaram a Paula, que vem de tecnologia, fizeram um Design Sprint de uma semana e dali saiu a primeira versão. A Thais resume assim: o produto "foi criado em cima das nossas dores".

Pessoas que você pode ver citadas:

| Pessoa | Papel |
|---|---|
| Paula Sanchez | Sócia, responsável por produto e tecnologia. Faz as demos, grava os vídeos do produto e cuida do site e do domínio. É quem aprova o seu trabalho. |
| Thais Previdelli | Sócia, comercial. |
| Cibelle Previdelli | Sócia, financeiro e comercial. |
| Michelle Finotti | Sócia, aprova verba. |
| Giselle Leite (Gi) | Do lado da V4. Vem de RH (15+ anos), grava conteúdo como rosto da marca e vende. |

As sócias também têm a Impactare, uma corretora de seguros. Por isso aparecem e-mails @impactare junto com @uptome.

O jeito delas, nas palavras da Thais: "a gente não é fácil, mas é muito legal". São diretas, informais e fogem de promessa exagerada. A Paula se descreve assim: "a gente é honesta demais e marqueteira de menos". Isso vale para o site inteiro (ver seção 9).

---

## 3. O produto

### Como funciona, na ordem que o usuário vive

O colaborador entra pelo celular. Quem não tem e-mail corporativo faz login com número de telefone e token por SMS, o que resolve o problema do pessoal de operação, de loja ou de obra.

No cadastro ele responde um questionário de perfil comportamental de cerca de 15 perguntas, inspirado no DISC (há uma parceria em andamento para usar o DISC oficial). O resultado vira um "manual" da pessoa: o que a motiva, como decide, o que a tira do eixo e o que ajuda. Uma versão leve fica visível para os colegas, com dicas práticas: como falar com ela, como delegar, como lidar com conflito, palavras que funcionam e palavras a evitar.

A tela inicial mostra a empresa como uma rede, com todos conectados. Cada pessoa tem uma bolinha de status: verde (recebeu feedback há pouco), amarela, vermelha (está há muito tempo sem feedback). O próprio colaborador mantém o seu líder e a sua área atualizados, e o RH para de mexer em organograma.

O feedback é o coração do produto. A interface lembra um aplicativo de conversa (a vendedora disse que "parece o Twitter/Threads, como conversar com amigos"). O líder escreve ou grava um áudio, do jeito que falaria. A IA reescreve considerando três coisas: o perfil de quem recebe, a hierarquia (fala-se diferente com chefe, par ou liderado) e o histórico (se o assunto se repete, ela dá mais peso ao impacto). O texto final sai sempre em quatro blocos: comportamento observado, impacto, expectativa e uma pergunta que convida à ação, escrita em "nós" ("o que podemos fazer para...").

Quem enviou recebe de volta o "feedback do feedback": a IA explica o que tirou e por quê (julgamento, tom de ordem entre colegas, elogio vazio). É aqui que o líder aprende. A Paula diz: "quanto mais eu uso, mais eu aprendo".

Quem recebe o feedback não responde por texto, para não virar toma-lá-dá-cá. Ele reage com opções prontas: "Foco no objetivo", "Vou criar o plano de ação", "Bora alinhar melhor", "Agradeço de verdade". O "Bora alinhar melhor" abre uma conversa presencial. Frase da própria Paula que vale para o site: a ferramenta "não pretende substituir a comunicação presencial, ela facilita essa abertura de porta e o registro".

Não existe feedback anônimo, e isso é de propósito. Todo feedback tem autor, data e registro.

### Funcionalidades (lista completa para você distribuir pelo site)

- Feedback com IA, por texto ou áudio, com o "feedback do feedback" para quem enviou
- Rascunho de conversa difícil: o líder prepara a conversa, conversa pessoalmente e depois registra (funcionalidade nova)
- Perfil comportamental de cada pessoa, aberto em versão prática para os colegas
- Feedback que vira ação: quem recebe escolhe ou escreve uma ação, que entra num quadro de acompanhamento
- PDI (plano de desenvolvimento individual) gerado pela IA a partir do perfil, dos feedbacks e da avaliação, ajustável pelo líder
- Avaliação de desempenho configurável: a empresa cadastra seus valores e competências e escolhe a periodicidade (mensal a semestral). A escala tem 4 níveis, sem meio-termo
- Metas (em lançamento, previsão de setembro/outubro de 2026, época em que as empresas definem metas do ano seguinte)
- Pontos e ranking por uso
- Relatórios para RH e diretoria: por líder, área e período; temas mais frequentes; quem dá e recebe mais feedback; quem nunca entrou
- Várias empresas numa conta só (serve para grupos)
- API aberta ("nascemos prontos para integrar")
- Login por celular com token, e modo de linguagem simplificada que o próprio colaborador liga ou desliga

Confirme com a Paula se avaliação de desempenho e metas já estão no ar antes de mostrar como disponível. As duas estavam voltando para a versão nova entre agosto e setembro.

### O que o produto não faz

Não faz departamento pessoal: admissão, folha, ponto e benefícios ficam de fora. A estratégia é conviver com os sistemas que a empresa já usa e fazer parceria com ferramentas de ponto, não competir com elas.

### O modelo de oferta atual

A linha comercial mais recente é plataforma com consultoria. A Paula resume assim: "plataformas não vendem consultoria e consultorias não vendem plataforma". Só a ferramenta não muda cultura, e o treinamento sozinho evapora. A UPtoME oferece as duas juntas: implantação e acompanhamento feitos por gente de RH, e a plataforma para o que foi ensinado continuar acontecendo no dia a dia. O site precisa de um espaço para isso.

### Visual do produto

A versão nova do app acabou de sair, já com a marca atual e com um design system próprio. Tem "cara de produto de verdade, não de puxadinho". Peça à Paula prints e gravações de tela da versão nova (ela gravou um vídeo de 17 minutos passando por todas as telas). Mostrar o produto funcionando é o que mais converte. Nas palavras dela, "a pessoa precisa conhecer a plataforma para falar 'é isso'".

---

## 4. Para quem

O público mudou algumas vezes, então vale a pena contar a história. Primeiro a campanha falou com RH em geral. Depois testamos duas verticais com LPs próprias, indústria/logística e construção civil, pensando no líder de operação que não tem e-mail. Essas verticais praticamente não geraram leads (por falta de verba para testar direito, não por prova de que não funcionam). O que respondeu foi RH e empresas pequenas de qualquer setor: farmácia com 35 funcionários, clínica veterinária, loja de material de construção, rede de estética, agência de RH. Em geral são empresas familiares de 10 a 50 pessoas, muitas sem RH estruturado, que cresceram rápido sem organizar a gestão de pessoas.

A decisão mais recente (setembro de 2026) é que o site fala com todo mundo que lidera pessoas, partindo da dor. O argumento muda por leitor:

| Quem lê | O que interessa | Linguagem |
|---|---|---|
| Dono ou diretor (quem assina) | Lucro, meta batida no prazo, turnover, custo de demissão, risco trabalhista | Resultado e risco |
| RH e T&D (quem defende a compra) | Feedback, clima, PDI, avaliação de desempenho, dados para levar à diretoria, menos trabalho manual | Ferramenta pronta e alívio operacional |
| Líder de equipe (quem usa) | Meta do time, conversa difícil sem briga, parecer um bom líder, praticidade | Facilidade: "manda um áudio e o resto a gente resolve" |

Empresas grandes com time de tecnologia próprio não são público (uma delas testou e disse que construiria internamente).

---

## 5. Dores, com as palavras de quem sente

Estas frases saíram de reuniões com as sócias, de entrevistas com clientes e de conversas com leads. Servem de matéria-prima para headline e seção de problema.

- "Tem muito líder jovem que é promovido e que não teve o devido preparo."
- "Empresas investem muitíssimo em treinamento de liderança e, quando o treinamento acaba, a liderança continua sem conseguir manter."
- "O líder volta a não saber o que fazer quando sai da sala de treinamento."
- "Eu não consigo lidar com os meus funcionários, eles não sabem me escutar." (dona de farmácia)
- "Você faz PDI, treina o líder, e mesmo assim ele não faz." / "O PDI ficou pro seu fim de semana."
- O feedback ainda é registrado no papel, no WhatsApp ou não é registrado. Todos os leads da campanha mais recente responderam "papel".
- O líder faz tudo ao mesmo tempo (cliente, equipe, problema) e não tem tempo para processo.
- Demissão sem histórico documentado vira processo trabalhista.
- Feedback agressivo por escrito vira print e vira prova contra a empresa.
- O bom técnico promovido vira o líder que dá bronca na frente de todo mundo.

A dor central, segundo a Thais, é a comunicação. O tema que as sócias querem ocupar no conteúdo é "como ter conversas difíceis sem machucar".

---

## 6. Posicionamento e diferenciais

A frase que resume a diferença, validada em reunião de venda:

> Os outros medem, registram e mandam relatório. A UPtoME desenvolve o líder na hora.

A UPtoME treina o líder enquanto ele lidera. Ferramentas de RH costumam medir clima, registrar feedback em formulário ou avaliar uma vez por ano. Algumas usam IA para escrever o feedback no lugar do gestor, ou para gerar um relatório depois. A UPtoME orienta no momento da conversa, e o líder melhora sem sala de aula. A Thais explica: "você está sendo treinado a ficar melhor sem você perceber".

Os quatro diferenciais que dá para provar, em ordem de força:

1. Treino do líder em tempo real, no próprio uso da ferramenta
2. Áudio e celular. Nenhum concorrente analisado aceita feedback por áudio, e o login por telefone atende quem não tem e-mail
3. Sem burocracia: sem projeto de implantação de meses, usa na mesma semana
4. Feedback que vira ação e fica registrado, em vez de avaliação anual esquecida

Existe uma ferramenta nova de "conversa difícil" no estilo ChatGPT. A diferença é que a UPtoME guarda o histórico, conhece o perfil de quem recebe e respeita a hierarquia.

Para a página inteira, uma regra: a UPtoME entra ao lado do sistema que a empresa já tem. Na feira de RH, clientes da Sólides diziam "eu tenho Sólides, mas quero isso". O site nunca deve dizer "troque sua ferramenta".

---

## 7. Concorrentes (para referência visual e de discurso)

| Concorrente | O que é | Como a UPtoME se coloca |
|---|---|---|
| Sólides | Líder em PME: departamento pessoal, recrutamento, perfil comportamental | Complementa: a Sólides cuida do DP, a UPtoME cuida da conversa entre líder e equipe |
| Qulture.Rocks | Suíte pesada de avaliação formal para empresa grande | Leve e do dia a dia, contra o ciclo formal anual |
| Feedz (TOTVS) | Clima e engajamento; o feedback é um formulário | Feedback como conversa que desenvolve |
| Mereo, Elofy, Impulseup | Gestão de desempenho por ciclo, IA que gera relatório depois | Orienta na hora, não depois |
| Pulses, TeamCulture | Pesquisa de clima | Elas medem o termômetro, a UPtoME desenvolve o líder |

Não ataque nenhuma pelo nome no site. Isso é contexto para você entender onde a marca precisa parecer diferente: menos cara de sistema corporativo pesado, mais cara de app que a pessoa usa no celular.

---

## 8. Provas: o que existe e o que falta

Hoje o site atual mostra três logos de clientes (Grupo Cesari, logística; Vibes Engenharia; Impactare Seguros), três depoimentos e três números (3× mais engajamento, 40% de redução de turnover, "100% comprometidos"). Não reaproveite nada disso sem confirmar com a Paula. As sócias disseram que não se sentem seguras para defender os números, pelo menos um dos clientes parou de usar a ferramenta, e a Impactare é empresa das próprias sócias.

Material que pode virar prova, depois de autorizado:

- Grupo Cesari (logística, cerca de 2.000 pessoas, Cubatão). A equipe criou o verbo "vamos mandar um UPtoME" e decidiu benefícios a partir de sugestões recebidas pela ferramenta.
- Impactare: "a gente consegue entender onde nós estamos falhando, e a ferramenta mostra ali o plano de ação."
- Feira de RH (maio de 2026): quem testava no iPad dizia "é isso que a gente procura". Uma gestora de empresa grande disse: "contrato consultoria para entregar o que vocês entregam, porque a minha ferramenta não entrega."

Deixe a seção de prova social pronta para receber logos e depoimentos, mas pensada para funcionar também sem eles, por exemplo mostrando o produto funcionando como prova.

Números de terceiros, como o do relatório Gallup ("feedback estruturado reduz ansiedade em cerca de 70%") ou multas da NR-1, só entram com fonte primária conferida.

---

## 9. Tom de voz

É uma linguagem simples, falada e direta. "Sem treino de liderança" em vez de "sem capacitação em gestão". "O PDI ficou pro seu fim de semana" em vez de "otimize seus processos de desenvolvimento". Humana e acolhedora, com uma pitada de humor (a marca é um rosto piscando).

Pedidos explícitos do cliente:

- A Paula acha que o Instagram atual "tá com cara de gerado por IA". Ela quer um tom pessoal, "para as pessoas se identificarem".
- Numa LP anterior a Paula reclamou do excesso de travessões. Evite.
- A Giselle quer dinamismo em tudo: "não pode ser burocrático, senão a gente fica igual aos outros".
- Nada de promessa em percentual ("reduz turnover em X%"). Prefira benefícios que dá para mostrar: registro, histórico, conversa melhor, líder que aprende.

No produto a linguagem tira o julgamento, descreve o fato e fala em "nós". O site pode fazer o mesmo.

---

## 10. Identidade visual

A fonte de verdade é o brandbook oficial, feito pelo Studio Blossom: `brandbook_UP_TO_ME (1).pdf`, com 20 páginas. Peça o arquivo para mim se ainda não tiver recebido. Os valores abaixo foram transcritos do PDF.

### Nome e logo

A grafia do logotipo é UPtoME: "UP" e "ME" em maiúsculas, "to" em minúsculas. Use assim no site.

O símbolo é um "U" roxo, grosso e arredondado, que funciona como sorriso. Em cima dele há um ponto laranja (olho) e um ">" laranja (piscadela). O conjunto forma um rosto piscando. O olho direito tem três variações oficiais: piscadela ">", coração e estrela de 4 pontas. O logotipo "UPtoME" vem em cinza, numa sans geométrica fina e arredondada.

As versões são:

- Principal colorida, vertical, preferencialmente sobre fundo branco
- Horizontal, com o símbolo à esquerda, indicada para digital
- Símbolo isolado, para avatar, favicon e elemento gráfico
- Uma cor (laranja, roxo ou cinza), só quando pedido
- Preto e branco, só para impressão

Na área de proteção, a margem mínima é a largura da letra U. O tamanho mínimo do logo completo é 3 cm / 300 px, e o do símbolo é 1,5 cm / 150 px.

O brandbook também traz uma estampa: padrão repetido com os "U" (em pé e invertidos), pontos, ">", "<", corações e estrelas, em roxo e laranja sobre branco. É um bom recurso de fundo e de seção.

### Cores

| Cor | Como está no brandbook | Hex (convertido do RGB) |
|---|---|---|
| Roxo | RGB 90 / 0 / 136 · CMYK 84 100 4 1 | `#5A0088` |
| Laranja | RGB 227 / 84 / 14 · CMYK 4 77 100 0 | `#E3540E` |
| Cinza | CMYK 0 0 0 71 · RGB 140 / 104 / 174 | não fechado, ver abaixo |

O cinza está inconsistente no próprio brandbook. O CMYK (K71) é um cinza neutro, mas o RGB escrito (140/104/174) é um lilás. A amostra no PDF é cinza. Até a Paula ou o Studio Blossom confirmarem, trate como pendência e não invente um valor final. Se precisar de um cinza provisório para rascunho, deixe marcado como provisório.

O brandbook não define cores de apoio (fundos claros, texto escuro, bordas). Se você precisar delas, derive do roxo e do laranja, deixe documentado como derivação e mostre para aprovação.

### Tipografia

O brandbook indica Montserrat (Light, Regular, Medium, Bold) e Inter (Light, Regular, Semi Bold, Extra Bold). Não diz qual é de título e qual é de texto. A leitura mais natural é Montserrat nos títulos e Inter no corpo, que foi o que o relatório do quiz usou e o cliente aprovou. Confirme.

### Fotografia

Pelo brandbook o clima é humano, real e próximo: ambientes de trabalho contemporâneos, luminosos e leves, diversidade, sensação de evolução e movimento, detalhes que contam história (caderno aberto, notebook, tela com gráfico simples, pessoas conversando). O cenário é sempre positivo.

Cuidado com o que já foi testado: numa LP de construção civil usamos fotos de obra com mão suja e luva rasgada, e a Paula pediu para "dar uma amenizada". Como o público agora é mais amplo, prefira gente real em ambiente de trabalho comum (loja, escritório pequeno, clínica, operação limpa) e telas do produto.

### Ícones

Traço médio, contorno (vazados), cantos arredondados, com leve sensação de movimento, nas cores da marca. Clean, amigáveis e tecnológicos. Nada de emoji nem de "✓/✕" soltos no lugar de ícone.

### Formas

Cantos arredondados em tudo (cards, botões, imagens). O cliente comentou isso como parte da identidade quando aprovou a LP anterior.

### Onde o que existe hoje diverge do brandbook

Siga o brandbook, não o que já está publicado.

- O site atual (GreatPages) usa laranja `#F96608`, roxo `#6B0FC1`, `#653394` e um roxo vivo `#9B2FF5` como destaque. Carrega Montserrat, Inter, Poppins, Roboto e Instrument Sans. Nenhuma dessas cores é a do brandbook.
- As LPs de teste de julho usaram Poppins nos títulos (fora do manual) e cores derivadas que não estão no brandbook (`#33004F`, `#FF7A2F`, `#A83400`, `#20182A`, `#6D6478`). Roxo e laranja batem.
- O relatório do quiz usou `#5B0088`, um ponto de diferença em relação ao oficial, e cores de semáforo (verde, mostarda, vermelho) que não são da marca.

---

## 11. O que já existe e você pode aproveitar

O site atual em `uptome.com.br` é uma página única no GreatPages com o título "UPtoME: um novo jeito de desenvolver pessoas e negócios". A estrutura é:

1. Hero: "Sua empresa perde dinheiro todo mês com algo que ninguém fala sobre"
2. Problema, com estatísticas
3. Três blocos de funcionalidade (Feedback com IA, Dashboard Estratégico, Planos de Desenvolvimento)
4. Grade com 8 recursos
5. Seção NR-1: "Feedback sem registro é passivo trabalhista", com o preço "a partir de R$ 450/mês"
6. Logos, números e depoimentos
7. Formulário de demonstração

Serve como inventário de conteúdo. As estatísticas e os números de resultado não devem ser reaproveitados (ver seção 8).

As LPs de teste de julho (indústria/logística e construção civil) tinham a estrutura hero com CTA para o quiz, "Você reconhece isso?" com 3 dores, "A virada" com 4 benefícios, ambiente real, como funciona em 3 passos, "feito para", prova, CTA final e modal do quiz. As headlines eram "Seus líderes de operação sabem dar feedback ou só apagam incêndio?" e "A liderança da sua obra está travando a produtividade?". O cliente gostou da copy voltada ao público e da identidade como um todo, e pediu imagens menos pesadas.

A LP mais recente (setembro) é de captura, sem setor e sem quiz, falando com RH e T&D ("feedback, T&D e avaliação de desempenho prontos"). O quiz saiu para ganhar volume. A palavra "feedback" precisa aparecer em destaque, porque o criativo que puxa lead é um vídeo da Giselle falando de feedback, e a página tem que casar com o anúncio.

O quiz de diagnóstico de liderança continua pronto e pode voltar como isca no site. Tem 5 perguntas:

1. Frequência de feedback estruturado
2. Como registram as conversas
3. Quantos líderes foram promovidos sem treino
4. Se já perderam um bom colaborador por causa da liderança
5. Se há gente sem e-mail corporativo

O resultado é um relatório em PDF com índice de 0 a 100, cinco faixas (de "situação crítica" a "alto nível") e quatro indicadores (governança da liderança, desenvolvimento de pessoas, conformidade e evidências, comunicação e engajamento). Inclui o custo do problema, um plano de 30/60/90 dias e um convite para uma conversa de 30 minutos. Posso te mandar os PDFs de exemplo.

Os criativos que performam melhor são vídeo (a Paula ou a Giselle falando, gravado no celular) e gravação de tela mostrando um feedback ruim virando um feedback bom. O estático performa pior. Vale ter no site um espaço para vídeo curto de demonstração.

---

## 12. Sugestão de estrutura

É ponto de partida, não obrigação. Ajuste como fizer sentido para o design.

### Site institucional

A home, na ordem:

1. Hero, com a dor da comunicação entre líder e equipe e a promessa de treinar o líder no dia a dia. CTA principal para falar com a equipe (WhatsApp ou formulário curto) e secundário "ver como funciona".
2. O problema: treinamento que evapora, líder promovido sem preparo, conversa que não fica registrada.
3. Como funciona em 3 passos: o líder fala do jeito dele (texto ou áudio), a IA transforma considerando quem recebe, e o feedback vira ação e histórico. Aqui cabe o antes e depois de um feedback, que é a demonstração mais forte do produto.
4. Funcionalidades: feedback com IA, conversa difícil, perfil comportamental, PDI, avaliação de desempenho, metas, relatórios.
5. Para quem, em três blocos (dono, RH, líder), cada um com o seu argumento (seção 4).
6. Plataforma com consultoria: a implantação e o acompanhamento feitos por gente de RH.
7. Convive com o que você já usa (sistemas de RH, ponto e folha).
8. Prova social (pronta para receber conteúdo).
9. Segurança e registro: sem anonimato, histórico datado, dados protegidos (LGPD).
10. CTA final.

Outras páginas sugeridas:

- Produto, com detalhe de cada funcionalidade
- Para empresas (RH, donos, líderes)
- Consultoria
- Sobre, com a origem das sócias
- Blog: o cliente quer tráfego orgânico e indexação, e o tema de conteúdo é "conversas difíceis sem machucar"
- Contato
- Link visível "Entrar", que leva ao app, separado do site

Sobre preço: a política está em revisão. A tabela atual começa em cerca de R$ 398/mês para até 20 pessoas, e há uma proposta de cobrança por usuário em discussão. Não publique valor fechado. Deixe a página ou seção de planos preparada para "fale com a gente" ou para receber valores depois.

### Landing page de captura

É uma página só, sem menu e com um objetivo: falar com a equipe.

1. Headline com "feedback" em destaque, falando com RH/T&D e com o dono de empresa pequena
2. Três dores reconhecíveis
3. Antes e depois de um feedback (a transformação pela IA)
4. Três ou quatro benefícios curtos
5. Vídeo curto do produto ou da Giselle
6. Prova, quando houver
7. CTA para WhatsApp e/ou formulário curto

No formulário, peça no máximo nome, empresa, WhatsApp, cargo e número de colaboradores. Valide e-mail corporativo se ele for pedido: a campanha já recebeu muito cadastro falso (tinha gente se cadastrando com nome de famoso).

### Técnico

- Deixe espaço para pixel da Meta, API de Conversões, GA4 e tag do Google Ads, e para UTMs chegarem ao CRM
- Faça mobile-first: o público chega pelo celular, vindo do Instagram
- Carregamento rápido. Uma referência citada pelo Victor foi a simplicidade das páginas da Apple
- SEO básico desde o início (títulos, descrições, sitemap), porque o site hoje não aparece no Google

---

## 13. Regras de texto sobre a NR-1 (importante)

A NR-1 é a norma do Ministério do Trabalho que, desde 26-05-2026, exige que as empresas identifiquem, acompanhem e documentem os riscos psicossociais (estresse, sobrecarga, assédio, metas abusivas) no programa de gerenciamento de riscos. Isso gera interesse e urgência, e foi o tema que trouxe os leads mais baratos no começo. A decisão, porém, foi não posicionar a UPtoME como "software de NR-1", porque isso diminui o produto. A NR-1 aparece como argumento secundário, e mais no Google do que no site principal.

Quando a NR-1 aparecer, estas frases não podem ser usadas:

- "Garante adequação à NR-1"
- "Não tome multa"
- "Certificada NR-1" (não existe certificação)

Podem ser usadas:

- "Registro de feedback e plano de ação que ajuda a documentar o acompanhamento de riscos psicossociais"
- "Reduz o esforço de comprovação exigido pela NR-1"
- "Complementa o seu programa de gerenciamento de riscos, não substitui"

Qualquer valor de multa só entra com fonte oficial conferida.

---

## 14. Pendências para validar com a Paula antes de fechar o layout

1. Valor final do cinza da marca e qual fonte é de título e qual é de texto
2. Arquivos do logo em vetor (SVG/AI) e da estampa
3. Prints e vídeos da versão nova do app
4. Quais clientes, logos e depoimentos podem aparecer
5. Se avaliação de desempenho e metas já estão no ar
6. Se existe período de teste grátis hoje
7. Como mostrar preço (ou se não mostra)
8. Onde o site vai ser hospedado e quem publica (Lovable no domínio próprio é o desejo declarado)
9. Contatos oficiais para o rodapé: WhatsApp, Instagram, LinkedIn e e-mail. O site atual não tem rodapé com essas informações
10. Se o quiz de diagnóstico volta como isca no site
