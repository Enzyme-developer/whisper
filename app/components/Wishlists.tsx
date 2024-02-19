"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCreatePoll, usePolls } from "../hooks/usePoll";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Delete, Loader2, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Poll from "./Poll";
import Loading from "../loading";
import { useWishlists } from "../hooks/useWishlist";

const wishlistSchema = z.object({
  title: z.string().min(3, { message: "Please enter a question" }),
  items: z
    .array(
      z.object({
        fieldValue: z.string().min(1, "Option is required"),
      })
    )
    .min(2, { message: "A minimum of 2 options is required" }),
});

const Wishlists = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: wishlists, isLoading, error } = useWishlists();
  const { mutate, isLoading: isCreating, isError } = useCreatePoll();

  if (error) {
    toast({
      variant: "destructive",
      title: "Something went wrong.",
      description: error?.toString(),
    });
  }

  type validationType = z.infer<typeof wishlistSchema>;

  const form = useForm<validationType>({
    resolver: zodResolver(wishlistSchema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  function onSubmit(values: any) {
    console.log(values);
    mutate(
      {
        question: values.title,
        options: values.items.map(
          (option: { fieldValue: string }) => option.fieldValue
        ),
      },
      {
        onSuccess: () => {
          setOpen(true);
          form.reset();
          toast({
            variant: "success",
            title: "Wishlist created successfully",
            description: "Your wishes are about to be granted",
          });
        },
        onError: (error: unknown) => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Looks like you cant make a wish yet",
          });
        },
      }
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-grow flex-col my-12 min-h-full w-full ">
      <Button
        onClick={() => setOpen(true)}
        className="flex self-end justify-self-end w-fit mb-4"
      >
        <PlusIcon className="w-5 h-5" color="white" />
        Create Wishlist
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-6">Create New Poll</DialogTitle>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="What is the occassion?"
                          {...field}
                          {...register("title")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fields.map((field, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <Input
                      {...field}
                      {...register(`items.${index}.fieldValue`)}
                      key={field.id}
                      className="flex-1"
                    />

                    <Delete
                      className="w-5 h-5"
                      color="grey"
                      type="button"
                      onClick={() => remove(index)}
                    />
                  </div>
                ))}

                <p className="text-sm text-red-500">
                  {errors?.items?.root?.message}
                </p>
                <Button
                  onClick={() => {
                    append({ fieldValue: "" });
                  }}
                  disabled={
                    errors?.items && (!errors?.items.root as unknown as boolean)
                  }
                >
                  <PlusIcon className="mr-2" /> Add Option
                </Button>
                <DialogFooter>
                  <Button
                    className="bg-[#540E38] hover:bg-orange-500 w-full"
                    size="lg"
                    type="submit"
                    disabled={fields.length < 1 || isCreating}
                  >
                    {isCreating && (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    )}
                    {isCreating ? "creating..." : "Create Wishlist"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {wishlists?.wishlists?.length !== 0 ? (
        <div className="grid items-center justify-center w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10">
          {wishlists?.polls?.map((poll: any, index: number) => (
            <div key={index} className="flex items-center justify-center">
              <Poll poll={poll} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-grow items-center justify-center">
          <p className="text-sm text-gray-500 font-medium">
            Nothing to see here...
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlists;
