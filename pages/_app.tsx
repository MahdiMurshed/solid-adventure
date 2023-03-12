import AdminLayout from "@components/admin/layout";
import ErrorBoundary from "@components/ErrorBoundary";
import { fetchMaterials } from "@hooks/materials";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps as Props } from "next/app";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 1000 * 60 * 2, // 2 minutes
  //   },
  // },
});



type AppProps = {
  Component: Props["Component"];
  pageProps: Props["pageProps"];
  session: Session | null;
};
Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps, session }: AppProps) {
  const [isSsr, setIsSsr] = useState(true);
  const router = useRouter();
  const isAdminRoute = router.pathname.includes("admin");
  useEffect(() => {
    setIsSsr(false);
    prefetchMaterials();
  }, [isSsr]);
  const prefetchMaterials = async () => {
    // The results of this query will be cached like a normal query
    await queryClient.prefetchQuery({
      queryKey: ["materials"],
      queryFn: fetchMaterials,
    });
  };

  if (isSsr) return null;
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <MantineProvider
            withGlobalStyles
            theme={{
              fontFamily: "var(--inter), sans-serif",
            }}
          >
            <Head>
              <meta name="viewport" content="viewport-fit=cover" />
            </Head>
            <main>
              {isAdminRoute ? (
                <AdminLayout>
                  <Component {...pageProps} />
                </AdminLayout>
              ) : (
                <Component {...pageProps} />
              )}
            </main>
            <ToastContainer />
          </MantineProvider>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
