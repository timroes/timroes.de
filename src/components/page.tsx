import React from 'react';
import Helmet from 'react-helmet';
import className from 'classnames';

import { Footer } from './footer';
import { Header } from './header';
import { Meta } from './meta';
import { CookieConsent } from './cookie-consent';

import css from './page.module.less';

interface PageProps {
  children: React.ReactNode;
  canonical: string;
  wide?: boolean;
  description?: string;
  title?: string;
}

export function Page({ children, title, description, canonical, wide }: PageProps) {
  const mainClass = className(css.page__main, {
    [css.page__mainWide]: wide,
  })
  return (
    <React.Fragment>
      <Helmet
        bodyAttributes={{ class: css.page }}
        htmlAttributes={{ lang: 'en' }}
      />
      <Meta pageTitle={title} description={description} canonical={canonical} />
      <Header wide={wide} />
      <main role="main" className={mainClass}>
        { children }
      </main>
      <Footer />
      <CookieConsent />
    </React.Fragment>
  );
}
