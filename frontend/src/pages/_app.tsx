import { Suspense, type ReactElement, type ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "app/store";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import SocketProvider from "@/context/SocketContext";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className={`max-w-[1280px] w-full mx-auto`}>
      <SocketProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Provider store={store}>
            <NextNProgress color="#3267b1" options={{ showSpinner: false }} />
            {getLayout(<Component {...pageProps} />)}
            <Toaster />
          </Provider>
        </ThemeProvider>
      </SocketProvider>
    </div>
  );
}
