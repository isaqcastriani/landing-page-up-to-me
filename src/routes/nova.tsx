import { createFileRoute, redirect } from "@tanstack/react-router";

// A LP nova virou a página principal. /nova continua funcionando para links antigos.
export const Route = createFileRoute("/nova")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
