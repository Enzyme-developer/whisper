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
  DialogTrigger,
} from "@/components/ui/dialog";
import { MailCheck } from "lucide-react";
import { useQueryClient } from "react-query";
import { useSendMessage } from "../hooks/useSend";

const formSchema = z.object({
  message: z.string().min(2).max(80, {
    message: "Message must be at least 2 characters.",
  }),
});

const SendMessage = () => {
  const [open, setOpen] = useState(false);

  const { mutate, isLoading, isError } = useSendMessage();

  const handleSend = async () => {
    // e.preventDefault();
    // try {
    //   const message = await createNewMessage();
    //   console.log(message);
    //   setOpen(true);
    // } catch (error) {
    //   console.log(error);
    // }
    mutate(
      { author: "", title: "" },
      {
        onSuccess: (response) => {
          console.log(response);
          setOpen(true);
        },
      }
    );
  };

  // const mutation = useMutation(sendMessage, {
  //   onSuccess: () => {},
  // });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    handleSend();
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
            <MailCheck color="green" className="w-8 h-8 mx-auto" />
            <p className="text-sm mt-4 text-center text-muted-foreground">
              Psst! Did you know? You are not just a sender; You are a reciever
              too. 📬
            </p>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#540E38] hover:bg-orange-500"
            >
              <Link href="messages"> Get your message</Link>
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
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendMessage;
