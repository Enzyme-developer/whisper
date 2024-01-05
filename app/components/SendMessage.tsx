"use client";
import { FormEvent, useState } from "react";
import { createNewMessage } from "../helpers/createMessage";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, MailCheck } from "lucide-react";
import { useSendMessage } from "../hooks/useSend";

const formSchema = z.object({
  message: z.string().min(2).max(50, {
    message: "Message must be at least 2 characters.",
  }),
});

const SendMessage = ({ recipient }: { recipient: string }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { mutate, isLoading, isError } = useSendMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(
      { recipient, content: values.message },
      {
        onSuccess: () => {
          setOpen(true);
        },
        onError: (error) => {
          console.log(error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your submission",
          });
        },
      }
    );
  }

  return (
    <div className="w-full max-w-4xl">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Mission accomplished! Your anonymous note is on its way!
            </DialogDescription>
            <MailCheck color="purple" className="w-8 h-8 mx-auto" />
            <p className="text-sm mt-4 text-center text-muted-foreground">
              Psst! Did you know? You are not just a sender; You are a reciever
              too. 📬
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#540E38] hover:bg-orange-500"
            >
              <Link href="/messages"> Get your message</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here."
                    {...field}
                    id="message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-[#540E38] hover:bg-orange-500"
            size="lg"
            type="submit"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isLoading ? "sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendMessage;
