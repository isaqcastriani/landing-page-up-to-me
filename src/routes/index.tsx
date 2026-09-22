import { createFileRoute } from "@tanstack/react-router";

import { LandingPageLight } from "@/components/landing/LandingPageLight";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UPtoME — PDI e avaliação de desempenho prontos" },
      {
        name: "description",
        content:
          "A UPtoME monta o PDI e a avaliação de desempenho a partir da reunião de alinhamento. Sem quiz, sem modelo genérico. Um especialista te chama no WhatsApp.",
      },
      { property: "og:title", content: "UPtoME — PDI e avaliação de desempenho prontos" },
      {
        property: "og:description",
        content:
          "A UPtoME monta o PDI e a avaliação de desempenho a partir da reunião de alinhamento. Sem quiz, sem modelo genérico.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPageLight />;
}
