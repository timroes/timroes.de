import React from 'react';
import Helmet from 'react-helmet';

import { Footer } from './footer';
import { Header } from './header';
import { Meta } from './meta';

import css from './page.module.less';

interface PageProps {
  children: React.ReactNode;
  description?: string;
  title?: string;
}

export function Page({ children, title, description }: PageProps) {
  return (
    <React.Fragment>
      <Helmet
        bodyAttributes={{ class: css.page }}
        htmlAttributes={{ lang: 'en' }}
      />
      <Meta pageTitle={title} description={description} />
      <Header />
      <main role="main" className={css.page__main}>
        { children }
      </main>
      <Footer />
    </React.Fragment>
  );
}
