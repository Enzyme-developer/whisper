"use client";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryWrapper;
