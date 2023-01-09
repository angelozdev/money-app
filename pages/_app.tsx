import React from "react";
import { NextUIProvider } from "@nextui-org/react";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";

// clients
import { queryClient } from "@/lib/react-query";

// types
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { current: supabase } = React.useRef(createBrowserSupabaseClient());

  return (
    <NextUIProvider>
      <SessionContextProvider
        initialSession={pageProps.initialSession}
        supabaseClient={supabase}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionContextProvider>
    </NextUIProvider>
  );
}
