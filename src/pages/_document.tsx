import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { getLanguages } from '../api';
import { ServerStyleSheet } from 'styled-components';

interface MyDocumentProps {
  language: string;
}

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      let language = 'en';
      if (ctx.query.slug) {
        const response = await getLanguages();
        if (
          response.data.languages.some(
            (language) => language.id === ctx.query.slug[0]
          )
        ) {
          language = ctx.query.slug[0];
        }
      }

      return {
        ...initialProps,
        language,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang={this.props.language}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
