import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
      privatePolicy: string;
    }
  }
}

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetadata>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            privacyPolicy
          }
        }
      }
    `
  );

  return site.siteMetadata;
};
