import React from 'react';
import Img from 'gatsby-image';
import { Link, StaticQuery, graphql } from 'gatsby';
import { GitHubLink, TwitterLink } from './social-link';
import css from './header.module.less';

function HeaderComponent({ data }) {
  return (
    <header role="banner" className={css.header}>
      <div className={css.header__content}>
        <Link
          to="/"
          className={css.header__homeLink}
          aria-label="Homepage"
          rel="home"
        >
          <Img
            aria-hidden="true"
            fixed={data.logo.childImageSharp.fixed}
            className={css.header__logo}
            outerWrapperClassName={css.header__logoWrapper}
          />
          { data.site.siteMetadata.title }
        </Link>

        <nav aria-label="Social media links" className={css.header__socialLinks}>
          <GitHubLink />
          <TwitterLink />
        </nav>
      </div>
    </header>
  )
}

export const Header = (props) => (
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
