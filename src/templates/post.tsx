import React, { useCallback, useState } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import Helmet from 'react-helmet';
import { Adsense, DisqusComments, Page, Pagination, RelatedPosts } from '../components';
import css from './post.module.less';
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg';
import { ReactComponent as ClockIcon } from '../icons/clock.svg';
import { ReactComponent as YouTubeIcon } from '../icons/youtube-icon.svg';

import 'prism-themes/themes/prism-a11y-dark.css';

interface PageInfo {
  slug: string;
  title: string;
  canonical: string;
}

export interface RelatedPost {
  node: {
    fields: {
      slug: string;
    };
    timeToRead: string;
    frontmatter: {
      title: string;
      slug: string;
      date: string;
      image: null | {
        childImageSharp: {
          fixed: FixedObject;
        };
      };
    };
  };
}

interface PostProps {
  pageContext: {
    canonical: string;
    category?: string;
    next?: PageInfo;
    prev?: PageInfo;
  };
  data: {
    post: {
      id: string;
      body: string;
      timeToRead: number;
      frontmatter: {
        title: string;
        date: string;
        shortDate: string;
        longDate: string;
        youtube?: string;
        summary?: string;
        image: null | {
          publicURL: string;
        };
      };
    };
    site: {
      siteMetadata: {
        siteUrl: string;
      };
    };
    relatedPosts: {
      edges: RelatedPost[];
    };
  };
}

export default ({ pageContext, data }: PostProps) => {
  const { post, relatedPosts } = data;
  const { body, timeToRead, frontmatter: meta } = post;
  const { canonical, next, prev } = pageContext;

  const [showVideo, setShowVideo] = useState(false);
  const onToggleVideo = useCallback(
    (ev: React.MouseEvent) => {
      ev.preventDefault();
      setShowVideo(!showVideo);
    },
    [showVideo]
  );

  return (
    <Page title={meta.title} canonical={canonical} description={meta.summary}>
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={meta.date} />
        {pageContext.category && <meta property="article:section" content={pageContext.category} />}
        {meta.image && (
          <meta
            property="og:image"
            content={`${data.site.siteMetadata.siteUrl}${meta.image.publicURL}`}
          />
        )}
        {prev && <link rel="prev" href={prev.canonical} />}
        {next && <link rel="next" href={next.canonical} />}
      </Helmet>
      <article className={css.post}>
        <h1 className={css.post__title}>{meta.title}</h1>
        <div className={css.post__meta}>
          <time
            dateTime={meta.date}
            aria-label={`Written on ${meta.longDate}`}
            className={css.post__metaItem}
          >
            <CalendarIcon className={css.post__metaIcon} aria-hidden="true" />
            {meta.shortDate}
          </time>
          <time
            aria-label={`Estimated reading time: ${timeToRead} minute${
              timeToRead !== 1 ? 's' : ''
            }`}
            dateTime={`P${timeToRead}M`}
            className={css.post__metaItem}
          >
            <ClockIcon className={css.post__metaIcon} aria-hidden="true" />
            {timeToRead} min read
          </time>
          {meta.youtube && (
            <>
              <span className={css.post__metaItem}>or</span>
              <a
                className={css.post__metaItem}
                href={`https://youtube.com/watch?v=${meta.youtube}`}
                onClick={onToggleVideo}
              >
                <YouTubeIcon className={css.post__metaIcon} aria-hidden="true" />
                Watch as video
              </a>
            </>
          )}
        </div>
        <Adsense slot="1960101956" />
        {meta.youtube && showVideo && (
          <iframe
            className={css.post__youtubeFrame}
            width="100%"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${meta.youtube}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        <div className={css.post__content}>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
        <Pagination next={next} prev={prev} />
      </article>
      <RelatedPosts categoryLabel={pageContext.category} posts={relatedPosts.edges} />
      <DisqusComments url={pageContext.canonical} title={meta.title} />
    </Page>
  );
};

export const query = graphql`
  query($slug: String!, $category: String) {
    post: mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        shortDate: date(formatString: "MMM D, YYYY", locale: "en")
        longDate: date(formatString: "MMMM D, YYYY", locale: "en")
        summary
        youtube
        image {
          publicURL
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
    relatedPosts: allMdx(
      filter: { frontmatter: { category: { eq: $category }, slug: { ne: $slug } } }
      sort: { fields: [frontmatter___date], order: [DESC] }
      limit: 4
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            date(formatString: "MMM D, YYYY", locale: "en")
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
  }
`;
