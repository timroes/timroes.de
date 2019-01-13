import React from 'react';
import { graphql } from 'gatsby';
import { DisqusComments, Page } from '../components';
import css from './post.module.less';
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg';
import { ReactComponent as ClockIcon } from '../icons/clock.svg';

// TODO: Need a color theme that has better WCAG contrast ratios
import 'prism-themes/themes/prism-xonokai.css';

interface PostProps {
  pageContext: {
    canonical: string;
  };
  data: {
    markdownRemark: {
      id: string;
      html: string;
      timeToRead: number;
      frontmatter: {
        title: string;
        date: string;
        shortDate: string;
        longDate: string;
        summary?: string;
      }
    }
  }
}

export default ({ pageContext, data }: PostProps) => {
  const { html, timeToRead, frontmatter: meta } = data.markdownRemark;
  return (
    <Page title={meta.title} description={meta.summary}>
      <article className={css.post}>
        <h1 className={css.post__title}>{ meta.title }</h1>
        <div className={css.post__meta}>
          <time
            dateTime={meta.date}
            aria-label={`Written on ${meta.longDate}`}
            className={css.post__metaItem}
          >
            <CalendarIcon className={css.post__metaIcon} aria-hidden="true" />
            { meta.shortDate }
          </time>
          <time
            aria-label={`Estimated reading time: ${timeToRead} minute${timeToRead !== 1 ? 's' : ''}`}
            dateTime={`P${timeToRead}M`}
            className={css.post__metaItem}
          >
            <ClockIcon className={css.post__metaIcon} aria-hidden="true" />
            { timeToRead } min read
          </time>
        </div>
        <div className={css.post__content} dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <DisqusComments
        url={pageContext.canonical}
      />
    </Page>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        shortDate: date(formatString: "MMM D, YYYY", locale: "en")
        longDate: date(formatString: "MMMM D, YYYY", locale: "en")
        summary
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
