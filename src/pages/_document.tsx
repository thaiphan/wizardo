import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getLanguages } from '../api';

interface MyDocumentProps {
  language: string;
}

export default class extends Document<MyDocumentProps> {
  static async getInitialProps(ctx) {
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
    };
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
