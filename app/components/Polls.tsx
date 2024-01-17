"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCreatePoll, usePolls } from "../hooks/usePoll";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const pollSchema = z.object({
  question: z.string().min(2).max(50, {
    message: "Message must be at least 2 characters.",
  }),
  options: z.string().optional(),
});

const Polls = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: polls, isLoading, error } = usePolls();
  const { mutate, isLoading: creating, isError } = useCreatePoll();

  if (error) {
    toast({
      variant: "destructive",
      title: "Something went wrong.",
      description: error?.toString(),
    });
  }

  const form = useForm<z.infer<typeof pollSchema>>({
    resolver: zodResolver(pollSchema),
    defaultValues: {
      question: "",
      options: [],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: options,
    }
  );

  function onSubmit(values: z.infer<typeof pollSchema>) {
    console.log(values)
    // mutate(
    //   { question: values.question, options: [] },
    //   {
    //     onSuccess: () => {
    //       setOpen(true);
    //       form.reset();
    //       toast({
    //         variant: "success",
    //         title: "Poll created successfully",
    //         description: "You can now be the INEC to your Nigeria",
    //       });
    //     },
    //     onError: (error: unknown) => {
    //       toast({
    //         variant: "destructive",
    //         title: "Uh oh! Something went wrong.",
    //         description: "There was a problem creating your poll",
    //       });
    //     },
    //   }
    // );
  }

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10 my-16">
      <button onClick={() => setOpen(true)}>Create Poll</button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Poll</DialogTitle>
            <DialogDescription>You are almost there!</DialogDescription>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your question</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your question here."
                          {...field}
                          id="question"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Options</FormLabel>
                        <FormControl>
                          <Input
                            {...form.register(`test.${index}.value`)}
                            // {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <button onClick={() => {
  append({ test: 'test' });
}}>Append</button>

                <Button
                  className="bg-[#540E38] hover:bg-orange-500"
                  size="lg"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  )}
                  {isLoading ? "creating..." : "Create Poll"}
                </Button>
              </form>
            </Form>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-orange-500"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {polls?.polls?.map((poll: any, index: number) => (
        <div key={index}>{poll.question}</div>
      ))}
    </div>
  );
};

export default Polls;
