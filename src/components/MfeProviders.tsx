import React from "react";
import { Provider } from "react-redux";
import { store } from "shared_remote/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "shared_remote/apiHelper";
import { AuthWrapper } from "shared_remote/AuthWrapper";

interface MfeProvidersProps {
  children: React.ReactNode;
}

export default function MfeProviders({ children }: MfeProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>{children}</AuthWrapper>
      </QueryClientProvider>
    </Provider>
  );
}
