import React from 'react';
import Helmet from 'react-helmet';

import css from './disqus-comments.module.less';

import { DiscussionEmbed } from 'disqus-react';

interface DisqusProps {
  url: string;
  title: string;
}

export function DisqusComments({ url, title }: DisqusProps) {
  return (
    <div className={css.discussion}>
      <Helmet>
        <link rel="preconnect" href="https://timroes.disqus.com" />
        <link rel="preconnect" href="https://c.disquscdn.com" />
        <link rel="preconnect" href="https://referrer.disqus.com" />
      </Helmet>
      <DiscussionEmbed
        shortname="timroes"
        config={{ url, title, identifier: url }}
      />
    </div>
  )
}
