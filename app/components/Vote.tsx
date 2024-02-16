"use client";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Loader2Icon, MailCheck } from "lucide-react";
import { usePoll, useVote } from "../hooks/usePoll";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const voteSchema = z.object({
  answer: z.string({ required_error: "You have to select an option" }),
});

const Vote = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { mutate, isLoading, isError } = useVote();
  const { data: poll, isLoading: pollLoading, error } = usePoll(id);

  const form = useForm<z.infer<typeof voteSchema>>({
    resolver: zodResolver(voteSchema),
  });

  function onSubmit(values: z.infer<typeof voteSchema>) {
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem("poll") == id) {
        toast({
          variant: "destructive",
          title: "Electoral Malpractice.",
          description: "You have cast your vote previously",
        });
        return;
      }
      mutate(
        { answer: values.answer, pollId: id },
        {
          onSuccess: () => {
            setOpen(true);
            localStorage.setItem("poll", JSON.stringify(id));
            form.reset();
            toast({
              variant: "success",
              title: "It's delivery 0'clock.",
              description: "Your vote has been cast",
            });
          },
          onError: (error: any) => {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description:
                error?.response.data.error ||
                "There was a problem with your submission",
            });
          },
        }
      );
    }
  }

  if (pollLoading) {
    return <Loader2Icon className="animate-spin w-8 h-8" color="purple" />;
  }

  if (error) {
    toast({
      variant: "destructive",
      title: "Something went wrong.",
      description: error?.toString(),
    });
  }

  return (
    <div className="w-full max-w-4xl">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Mission accomplished! Your vote is on its way!
            </DialogDescription>
            <MailCheck color="purple" className="w-8 h-8 mx-auto" />
            <p className="text-sm mt-4 text-center text-muted-foreground">
              Psst! Did you know? You are not just a voter; You can be the INEC
              chairman too. 📬
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-orange-500"
            >
              <Link href="/polls"> Get your Votes</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg">
                  {poll?.poll?.question}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {poll?.poll?.options?.map(
                      (option: string, index: number) => (
                        <FormItem
                          key={index}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option}
                          </FormLabel>
                        </FormItem>
                      )
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-[#540E38] hover:bg-orange-500"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isLoading ? "voting..." : "Cast vote"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Vote;
