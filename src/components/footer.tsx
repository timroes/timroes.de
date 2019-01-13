import React from 'react';

import css from './footer.module.less';

export function Footer() {
  return (
    <footer className={css.footer}>
      <a href="https://www.iubenda.com/privacy-policy/91999772" className={css.footer__link} target="_blank" rel="noopener nofollow">Privacy Policy</a>
    </footer>
  );
}
