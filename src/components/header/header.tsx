import React from 'react';
import className from 'classnames';
import Img, { FixedObject } from 'gatsby-image';
import { Link, StaticQuery, graphql } from 'gatsby';
import { GitHubLink, TwitterLink, YoutubeLink } from './social-link';
import css from './header.module.less';

interface HeaderProps {
  wide?: boolean;
  data: {
    site: {
      siteMetadata: {
        title: string;
      }
    },
    logo: {
      childImageSharp: {
        fixed: FixedObject;
      }
    }
  }
}

function HeaderComponent({ data, wide }: HeaderProps) {
  const contentClass = className(css.header__content, {
    [css.header__contentWide]: wide,
  });
  return (
    <header role="banner" className={css.header}>
      <div className={contentClass}>
        <Link
          to="/"
          className={css.header__homeLink}
          aria-label="Homepage - Tim Roes"
          rel="home"
        >
          <Img
            aria-hidden="true"
            fixed={data.logo.childImageSharp.fixed}
            className={css.header__logo}
          />
          { data.site.siteMetadata.title }
        </Link>

        <nav aria-label="Social media links" className={css.header__socialLinks}>
          <GitHubLink />
          <YoutubeLink />
          <TwitterLink />
        </nav>
      </div>
    </header>
  )
}

export const Header = (props: Omit<HeaderProps, 'data'>) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fixed(width: 42, height: 42) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <HeaderComponent data={data} {...props} />}
  />
);
