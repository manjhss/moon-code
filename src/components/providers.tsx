"use client";

import { useAuth } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  ConvexReactClient,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactNode } from "react";
import UnauthenticatedView from "@/features/auth/components/unauthenticated-view";
import AuthLoadingView from "@/features/auth/components/auth-loading-view";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark, // Set initial theme to dark as per ThemeProvider default
        variables: {
          // colorBackground: "oklch(var(--background))",
          // colorInputBackground: "oklch(var(--input))",
          // colorInputText: "oklch(var(--foreground))",
          // fontFamily: outfit.style.fontFamily,
        },
        elements: {
          // You can further customize individual elements here
          // For example:
          // formButtonPrimary: {
          // color: "oklch(var(--button-text))",
          // backgroundColor: "oklch(var(--destructive))",
          // },
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Authenticated>
            {children}
          </Authenticated>

          <Unauthenticated>
            <UnauthenticatedView />
          </Unauthenticated>

          <AuthLoading>
            <AuthLoadingView />
          </AuthLoading>
        </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
