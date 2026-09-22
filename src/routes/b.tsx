import { createFileRoute } from "@tanstack/react-router";

import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/b")({
  head: () => ({
    meta: [
      { title: "UPtoME — Versão B" },
      {
        name: "description",
        content:
          "UPtoME: IA que treina o líder em tempo real e ajuda a mitigar o risco psicossocial da NR-1. Feedback por áudio, sem burocracia. Faça o diagnóstico grátis.",
      },
    ],
  }),
  component: VersionB,
});

function VersionB() {
  return <LandingPage />;
}
