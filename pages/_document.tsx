// pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
      <Head>
        <link rel="icon" type="image/png" href="/mainIcon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/mainIcon.png" />
      </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
