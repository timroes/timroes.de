import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import css from './footer.module.less';

const FooterComponent: React.SFC<{ privacyUrl: string }> = (props) => {
  return (
    <footer className={css.footer}>
      <a href={props.privacyUrl} className={css.footer__link} target="_blank" rel="noopener nofollow">Privacy Policy</a> ◦{' '}
      <a href="https://github.com/timroes/timroes.de" className={css.footer__link} target="_blank" rel="noopener nofollow">Source Code</a>
    </footer>
  );
}

export const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            privacyPolicy
          }
        }
      }
    `}
    render={data => <FooterComponent privacyUrl={data.site.siteMetadata.privacyPolicy} />}
  />
);
