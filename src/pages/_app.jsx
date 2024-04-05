import "@/styles/globals.css";

import Head from "next/head";
import { Inter } from "next/font/google";
import RootLayout from "./layout";
import { SITE_NAME } from "@/constants/global";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content="Maxim biology site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={inter.className}>
        <RootLayout>
          {getLayout(<Component {...pageProps} />)}
        </RootLayout>
      </main>
    </>
  );
}
