"use client";
import { useToast } from "@/components/ui/use-toast";
import { useCreatePoll } from "../hooks/usePoll";

const CreatePoll = () => {
  const { toast } = useToast();

  const { mutate, isLoading, isError } = useCreatePoll();

  const handleCreatePoll = () => {
    mutate(
      { question: "Are you  Dark", options: ["Yes", "No", "Maybe"] },
      {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "It's delivery 0'clock.",
            description: "Your message has been sent",
          });
        },
        onError: (error: unknown) => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your submission",
          });
        },
      }
    );
  };
  return (
    <div>
      CreatePoll
      <button onClick={handleCreatePoll}>Create Poll</button>
    </div>
  );
};

export default CreatePoll;
