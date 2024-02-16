import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "../utils/faqs";

export function Faq() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData?.map(
        (faq: { answer: string; question: string }, index: number) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        )
      )}
    </Accordion>
  );
}
