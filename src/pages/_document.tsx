import { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { DocumentHeadTags, documentGetInitialProps } from "@mui/material-nextjs/v13-pagesRouter";
import type { DocumentHeadTagsProps } from "@mui/material-nextjs/v13-pagesRouter";

export default function MyDocument(props: DocumentHeadTagsProps) {
  return (
    <Html lang="pt-BR">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
