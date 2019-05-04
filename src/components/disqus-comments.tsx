import React from 'react';
import Helmet from 'react-helmet';

import css from './disqus-comments.module.less';

// @ts-ignore
import { DiscussionEmbed } from 'disqus-react';

interface DisqusProps {
  url: string;
}

export function DisqusComments({ url }: DisqusProps) {
  return (
    <div className={css.discussion}>
      <Helmet>
        <link rel="preconnect" href="https://timroes.disqus.com" />
        <link rel="preconnect" href="https://c.disquscdn.com" />
        <link rel="preconnect" href="https://referrer.disqus.com" />
      </Helmet>
      <DiscussionEmbed
        shortname="timroes"
        config={{ url }}
      />
    </div>
  )
}
