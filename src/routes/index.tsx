import { createFileRoute } from "@tanstack/react-router";

import { NovaLanding } from "@/components/nova/NovaLanding";

// Pixel da Meta e GA4 só carregam se os IDs estiverem nas variáveis de
// ambiente do Lovable. Os eventos (generate_lead, cta_click) saem de src/lib/lead.ts.
const META_PIXEL_ID = (import.meta.env["VITE_META_PIXEL_ID"] as string | undefined) ?? "";
const GA4_ID = (import.meta.env["VITE_GA4_ID"] as string | undefined) ?? "";

function trackingScripts() {
  const scripts: Array<{ children?: string; src?: string; async?: boolean }> = [];
  if (META_PIXEL_ID) {
    scripts.push({
      children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
    });
  }
  if (GA4_ID) {
    scripts.push({ src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, async: true });
    scripts.push({
      children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA4_ID}');`,
    });
  }
  return scripts;
}

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
  scripts: trackingScripts,
  component: NovaLanding,
});
