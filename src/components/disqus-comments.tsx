import React from 'react';
import Helmet from 'react-helmet';

// @ts-ignore
import { DiscussionEmbed } from 'disqus-react';

export function DisqusComments({ url }) {
  return (
    <React.Fragment>
      <Helmet>
        <link rel="preconnect" href="https://timroes.disqus.com" />
        <link rel="preconnect" href="https://c.disquscdn.com" />
        <link rel="preconnect" href="https://referrer.disqus.com" />
      </Helmet>
      <DiscussionEmbed
        shortname="timroes"
        config={{ url }}
      />
    </React.Fragment>
  )
}
