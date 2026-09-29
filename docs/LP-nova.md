# LP nova (`/`, antes em `/nova`)

Landing page de captura construída sobre a estrutura da referência do Behance
("Página de Vendas - Sistema Magnético"), com copy nova para a UPtoME, seguindo
o briefing (`docs/UPtoME-briefing-designer-site-e-LP.md`) e o framework de LP do
Richard (contexto, ICP, consciência, narrativa problema → mecanismo → prova →
oferta → CTA, objeções quebradas ao longo da página, estranheza).

A LP antiga continua em `/` e a versão escura em `/b`. Nada delas foi alterado.

## Onde está cada coisa

| Arquivo | O quê |
|---|---|
| `src/routes/nova.tsx` | Rota, SEO, fontes (Montserrat + Inter) e scripts de tracking |
| `src/components/nova/NovaLanding.tsx` | Todas as seções da página |
| `src/components/nova/mocks.tsx` | Telas do produto desenhadas em código |
| `src/lib/nova-data.ts` | Toda a copy (editar texto aqui) |
| `src/lib/lead.ts` | Formulário: validação, UTMs, webhook, WhatsApp, eventos |
| `public/video/vsl-uptome.mp4` | VSL comprimido (720p, ~5 MB) |
| `src/assets/nova/` | Fotos geradas no ChatGPT, pôster do vídeo e símbolo da marca |
| `src/styles.css` (bloco `.nv`) | Cores e animações, escopadas só nesta página |

## Variáveis de ambiente (Lovable > Settings > Environment)

| Variável | Para quê | Sem ela |
|---|---|---|
| `VITE_LEAD_WEBHOOK_URL` | POST com o lead (Make, Zapier, n8n, CRM) | o lead não é salvo em lugar nenhum |
| `VITE_WHATSAPP_NUMBER` | Abre o WhatsApp com a mensagem pronta após o envio. Só dígitos: `5511999999999` | a tela de sucesso aparece sem o botão do WhatsApp |
| `VITE_META_PIXEL_ID` | Carrega o Pixel e dispara `Lead` no envio | sem pixel |
| `VITE_GA4_ID` | Carrega o GA4 e dispara `generate_lead` | sem GA4 |

O payload do webhook leva `nome, empresa, whatsapp, cargo, colaboradores`,
as UTMs da sessão (`utm_*`, `gclid`, `fbclid`), `pagina` e `enviado_em`.
Todo clique de CTA também vai para o `dataLayer` como `cta_click`.

## Cores

Roxo `#5A0088` e laranja `#E3540E` vêm do brandbook. As demais (creme, lilás,
roxo-noite, cinza de texto) são derivadas e estão marcadas como provisórias em
`src/styles.css`, porque o cinza oficial ainda está em aberto (pendência 1 do briefing).

## O que ainda depende da Paula

1. Número oficial de WhatsApp e destino do lead (webhook ou CRM)
2. Autorização de logos e depoimentos: a página não mostra nenhum cliente de propósito
3. Confirmar se avaliação de desempenho já está no ar (aparece na lista da plataforma)
4. Prints reais da versão nova: os mocks em `mocks.tsx` podem ser trocados por imagem
5. Aprovação das cores derivadas e da dupla Montserrat (títulos) + Inter (texto)
6. Se a página nova substitui a `/` (hoje ela vive em `/nova`)

Os exemplos de "antes e depois" são ilustrativos e estão sinalizados assim na página.
