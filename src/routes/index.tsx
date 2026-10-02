import { createFileRoute } from "@tanstack/react-router";

import { NovaLanding } from "@/components/nova/NovaLanding";

const title = "UPtoME | Seu líder manda um áudio, a IA devolve um feedback de verdade";
const description =
  "A UPtoME transforma o relato do líder, por texto ou áudio, em feedback claro e adaptado a quem recebe. Registra tudo e ensina o líder a falar melhor. Veja funcionando.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#5a0088" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap",
      },
      { rel: "preload", as: "video", href: "/video/vsl-uptome.mp4", type: "video/mp4" },
    ],
  }),
  component: NovaLanding,
});
