import React from 'react';
import Helmet from 'react-helmet';
import { Page } from '../components';
import { Link, graphql } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';
import { ReactComponent as BannerPlaceholder } from '../images/banner-placeholder.svg';
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg';
import { ReactComponent as ClockIcon } from '../icons/clock.svg';

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
              <Link to={post.fields.slug} className={css.postlink}>
                { post.frontmatter.image ?
                  <Img fixed={post.frontmatter.image.childImageSharp.fixed} className={css.postlink__banner} /> :
                  <BannerPlaceholder className={css.postlink__banner} />
                }
                <div className={css.postlink__overlay}>
                  <div className={css.postlink__title}>{post.frontmatter.title}</div>
                  <div className={css.postlink__meta}>
                    <span><CalendarIcon className={css.postlink__icon} /> {post.frontmatter.date}</span>
                    <span><ClockIcon className={css.postlink__icon} /> {post.timeToRead} min read</span>
                  </div>
                </div>
              </Link>
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
