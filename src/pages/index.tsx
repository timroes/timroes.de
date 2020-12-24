import React from 'react';
import Helmet from 'react-helmet';
import { Page } from '../components';
import { PostList, Post } from '../components/postlist';
import { graphql } from 'gatsby';

// Must match the result of the below graphql query
interface IndexData {
  allMdx: {
    posts: Post[];
  },
  site: {
    siteMetadata: {
      description: string;
      siteUrl: string;
    }
  }
}

interface IndexPageProps {
  data: IndexData;
}

export default ({ data }: IndexPageProps) => {
  return (
    <Page
      wide={true}
      canonical={data.site.siteMetadata.siteUrl}
      description={data.site.siteMetadata.description}
    >
      <Helmet>
      	<meta property="og:type" content="website" />
      </Helmet>
      <PostList posts={data.allMdx.posts} />
    </Page>
  );
};

export const query = graphql`
{
  allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
    posts: edges {
      node {
        fields {
          slug
        }
        timeToRead
        frontmatter {
          title
          category
          date(formatString: "MMM D, YYYY")
          image {
            childImageSharp {
              fixed(width: 350) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
  }
  site {
    siteMetadata {
      description
      siteUrl
    }
  }
}`;
