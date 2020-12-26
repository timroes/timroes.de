import React from 'react';
import Helmet from 'react-helmet';
import { useSiteMetadata } from '../utils/use-sitemetadata';

declare global {
  interface Window {
    cookieconsent: {
      initialise: (config: unknown) => void;
    };
  }
}

class CookieConsentComponent extends React.Component<{ privacyUrl: string }> {
  public componentDidMount() {
    window.addEventListener('load', () => {
      window.cookieconsent.initialise({
        palette: {
          popup: {
            background: '#252e39',
          },
          button: {
            background: '#00705f',
          },
        },
        theme: 'edgeless',
        position: 'bottom-right',
        content: {
          href: this.props.privacyUrl,
        },
      });
    });
  }

  public render() {
    return (
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js"></script>
      </Helmet>
    );
  }
}

export const CookieConsent = () => {
  const { privacyPolicy } = useSiteMetadata();
  return <CookieConsentComponent privacyUrl={privacyPolicy} />;
};
