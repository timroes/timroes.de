import React from 'react';
import Helmet from 'react-helmet';
import { useSiteMetadata } from '../../utils/use-sitemetadata';

interface MetaProps {
  pageTitle?: string;
  description?: string;
  canonical: string;
}

export function Meta({ pageTitle, description, canonical }: MetaProps) {
  const { title: siteTitle } = useSiteMetadata();
  return (
    <Helmet>
      <link rel="canonical" href={canonical}/>
      <title>{ pageTitle ? `${pageTitle} » ${siteTitle}` : siteTitle }</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter meta tags (that are not already covered by OpenGraph) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tim_roes" />
    	<meta name="twitter:creator" content="@tim_roes" />
    </Helmet>
  );
}
