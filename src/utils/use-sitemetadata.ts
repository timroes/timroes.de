import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
      privacyPolicy: string;
    };
  };
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
