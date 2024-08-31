import { type ReactElement, type ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "app/store";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import SocketProvider from "@/context/SocketContext";
import NextNProgress from "nextjs-progressbar";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div>
      <Provider store={store}>
        <SocketProvider>
          <NextNProgress color="#3267b1" options={{ showSpinner: false }} />
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
        </SocketProvider>
      </Provider>
    </div>
  );
}
