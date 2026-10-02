// Captura de lead da LP nova (/).
//
// Nada aqui depende de backend próprio. O destino do lead é configurado por
// variáveis de ambiente (Lovable > Project Settings > Environment):
//   VITE_LEAD_WEBHOOK_URL  -> recebe um POST com o lead (Make, Zapier, n8n, CRM)
//   VITE_WHATSAPP_NUMBER   -> só dígitos, com DDI e DDD (ex.: 5511999999999)
// Sem nenhuma das duas, o formulário continua funcionando na tela e registra
// o evento de conversão, mas o lead não vai para lugar nenhum.

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

const STORAGE_KEY = "uptome_utms";

export type Lead = {
  nome: string;
  empresa: string;
  whatsapp: string;
  cargo: string;
  colaboradores: string;
};

export const WHATSAPP_NUMBER = ((import.meta.env["VITE_WHATSAPP_NUMBER"] as string | undefined) ?? "").replace(/\D/g, "");
const WEBHOOK_URL =
  (import.meta.env["VITE_LEAD_WEBHOOK_URL"] as string | undefined) ??
  "https://hook.us1.make.celonis.com/3nvu2uw2e811shce0ploiwce8huhibll";

// Guarda as UTMs da primeira visita da sessão, para não perder a origem
// quando a pessoa navega por âncoras antes de preencher.
export function captureUtms() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value;
    }
    if (Object.keys(found).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // sessionStorage bloqueado: segue sem UTM
  }
}

function readUtms(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

type TrackingWindow = Window & {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as TrackingWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
  if (event === "generate_lead") {
    w.fbq?.("track", "Lead");
    w.gtag?.("event", "generate_lead", params);
  }
}

export function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function validateLead(lead: Lead): string | null {
  if (lead.nome.trim().split(/\s+/).length < 2) return "Coloca nome e sobrenome, por favor.";
  if (lead.empresa.trim().length < 2) return "Qual é o nome da empresa?";
  const digits = lead.whatsapp.replace(/\D/g, "");
  if (digits.length < 10 || /^(\d)\1+$/.test(digits)) return "Confere o WhatsApp com DDD.";
  if (!lead.colaboradores) return "Escolhe quantas pessoas tem na empresa.";
  return null;
}

export function whatsappLink(message: string) {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export async function submitLead(lead: Lead) {
  const payload = {
    ...lead,
    ...readUtms(),
    pagina: typeof window !== "undefined" ? window.location.pathname : "",
    enviado_em: new Date().toISOString(),
  };

  track("generate_lead", { colaboradores: lead.colaboradores, cargo: lead.cargo });

  if (WEBHOOK_URL) {
    try {
      // application/x-www-form-urlencoded é "simple request" (sem preflight de
      // CORS) e o Make separa cada campo automaticamente no cenário.
      const body = new URLSearchParams();
      for (const [key, value] of Object.entries(payload)) {
        body.append(key, String(value));
      }
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
        body: body.toString(),
        keepalive: true,
      });
    } catch {
      // O lead ainda segue pelo WhatsApp, se houver número.
    }
  }

  return whatsappLink(
    `Oi! Sou ${lead.nome}, da ${lead.empresa} (${lead.colaboradores} pessoas). ` +
      `Quero ver a UPtoME funcionando.`,
  );
}
