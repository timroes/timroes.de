import React from 'react';
import { Page } from '../components';
import { Meta } from '../components/meta';
import { Link, graphql } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';

// Must match the result of the below graphql query
interface IndexData {
  allMarkdownRemark: {
    posts: Array<{
      node: {
        fields: {
          slug: string;
        },
        frontmatter: {
          title: string;
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
    }
  }
}

interface IndexPageProps {
  data: IndexData;
}

export default ({ data }: IndexPageProps) => {
  return (
    <Page
      description={data.site.siteMetadata.description}
    >
      <ul>
        { data.allMarkdownRemark.posts.map(({ node }) => (
          <li key={node.fields.slug}>
            <Link to={node.fields.slug}>
              {node.frontmatter.title}
              { node.frontmatter.image && <Img fixed={node.frontmatter.image.childImageSharp.fixed} /> }
            </Link>
          </li>
        )) }
      </ul>
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
        frontmatter {
          title
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
    }
  }
}`;
