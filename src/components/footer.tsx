import React from 'react';
import { Link } from 'gatsby';
import css from './footer.module.less';

export function Footer() {
  return (
    <footer className={css.footer}>
      <Link to="/privacy-policy/" className={css.footer__link}>Privacy Policy</Link>
    </footer>
  );
}
