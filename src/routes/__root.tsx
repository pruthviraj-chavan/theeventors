import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { IntroLoader } from "../components/site/Loader";
import { MobileCta } from "../components/site/MobileCta";
import { motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function StatusScreen({ code, title, text, children }: { code: string; title: string; text: string; children: ReactNode }) {
  return (
    <div className="bg-night grain relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-pearl">
      <div className="light-leak top-10 left-0 h-72 w-72 bg-magenta/30" />
      <div className="light-leak right-0 bottom-10 h-80 w-80 bg-gold/30" />
      <div className="relative max-w-md text-center">
        <p className="font-display text-gold-gradient text-8xl italic">{code}</p>
        <h1 className="mt-4 text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-pearl/65">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <StatusScreen code="404" title="This moment doesn't exist" text="The page you're looking for has moved — but beautiful yaadein are still waiting.">
      <Link to="/" className="btn-gold">Back to home</Link>
    </StatusScreen>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <StatusScreen code="Oops" title="Something didn't go to plan" text="Even the best events have hiccups. Please try again, or head back home.">
      <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold">Try again</button>
      <a href="/" className="btn-ghost-light">Go home</a>
    </StatusScreen>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Yaadein — Events & Experiences" },
      { name: "description", content: "We don't plan events. We craft yaadein. Weddings, corporate, social and birthday experiences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <IntroLoader />
      <Nav />
      <main>
        <PageFade>
          <Outlet />
        </PageFade>
      </main>
      <Footer />
      <MobileCta />
    </QueryClientProvider>
  );
}

function PageFade({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <motion.div key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
