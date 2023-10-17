import "@/styles/globals.css";
import type { NextComponentType } from 'next';
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { CookiesProvider } from "react-cookie";

interface CustomAppProp extends AppProps {
  pageProps: {
    session?: Session;
  } & AppProps["pageProps"];
}

type CustomAppProps = CustomAppProp & {
  Component: NextComponentType
}

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </SessionProvider>
  );
}

export default CustomApp;