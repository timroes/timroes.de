import React from 'react';
import { useSiteMetadata } from '../utils/use-sitemetadata';

import css from './footer.module.less';

export const Footer: React.FC = () => {
  const { privacyPolicy } = useSiteMetadata();
  return (
    <footer className={css.footer}>
      <a
        href={privacyPolicy}
        className={css.footer__link}
        target="_blank"
        rel="noopener nofollow noreferrer"
      >
        Privacy Policy
      </a>{' '}
      ◦{' '}
      <a
        href="https://github.com/timroes/timroes.de"
        className={css.footer__link}
        target="_blank"
        rel="noopener nofollow noreferrer"
      >
        Source Code
      </a>
    </footer>
  );
};
