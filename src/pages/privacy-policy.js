import React from 'react';
import { graphql } from 'gatsby';

import { Page } from '../components';

export default function PrivacyPolicy({ data }) {
  return (
    <Page pageTitle={data.site.siteMetadata.title} description={data.site.siteMetadata.description}>
      <h1>Privacy Policy</h1>
    </Page>
  );
};


export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
