import React from 'react';
import Helmet from 'react-helmet';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

interface AdsenseProps {
  slot: string;
}

export class Adsense extends React.Component<AdsenseProps> {

  public componentDidMount() {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch(e) {
      // Catch any errors occuring from google adsense, log them and ignore them
      console.error(e);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Helmet>
        <ins
            className="adsbygoogle"
            style={{ display: 'block', height: '90px' }}
            aria-hidden="true"
            data-ad-client="ca-pub-8939524074366904"
            data-ad-slot={this.props.slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
      </React.Fragment>
    )
  }
}
