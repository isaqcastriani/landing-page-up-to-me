import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <Collapsible className="group border-b border-border">
      <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between gap-5 py-[22px] text-left font-display text-[17px] font-semibold text-foreground">
        {question}
        <span
          className="shrink-0 font-display text-[26px] text-primary transition-transform duration-300 ease-out group-data-[state=open]:rotate-45"
          aria-hidden
        >
          +
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <p className="w-full pb-[22px] text-[15px] text-muted-foreground">{answer}</p>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function FaqList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
