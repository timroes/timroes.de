import React from 'react';
import Helmet from 'react-helmet';
import { Page, PostCard } from '../components';
import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';

import css from './index.module.less';

// Must match the result of the below graphql query
interface IndexData {
  allMarkdownRemark: {
    posts: Array<{
      node: {
        fields: {
          slug: string;
        },
        timeToRead: string;
        frontmatter: {
          title: string;
          date: string;
          image: null | {
            childImageSharp: {
              fixed: FixedObject;
            }
          }
        }
      }
    }>
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
      <nav aria-label="Posts">
        <ul className={css.postlist}>
          { data.allMarkdownRemark.posts.map(({ node: post }) => (
            <li key={post.fields.slug} className={css.postlist__entry}>
              <PostCard
                slug={post.fields.slug}
                timeToRead={post.timeToRead}
                {...post.frontmatter}
              />
            </li>
          )) }
        </ul>
      </nav>
    </Page>
  );
};

export const query = graphql`
{
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    posts: edges {
      node {
        fields {
          slug
        }
        timeToRead
        frontmatter {
          title
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
