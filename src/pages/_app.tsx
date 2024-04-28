import "@/styles/globals.css";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const queryClient = new QueryClient();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <AppCacheProvider {...props}>
      <Head>
        <title>Health Team Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Health Team Admin" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </AppCacheProvider>
  );
}
