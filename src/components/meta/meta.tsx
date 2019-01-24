import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

interface MetaComponentProps {
  pageTitle?: string;
  description?: string;
  siteTitle: string;
  canonical: string;
}

export function MetaComponent({ pageTitle, description, siteTitle, canonical }: MetaComponentProps) {
  return (
    <Helmet>
      <link rel="canonical" href={canonical}/>
      <title>{ pageTitle ? `${pageTitle} » ${siteTitle}` : siteTitle }</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={siteTitle} />
{ /*
{{#if type_post}}
	{{!-- Set meta tags that apply to posts only --}}

	{{!-- Specific open graph tags for articles --}}
	<meta property="og:type" content="article">
	<meta property="article:section" content="{{use-first post.meta.category config.blog.category 'Misc'}}">
	<meta property="article:published_time" content="{{date-iso post.meta.created}}">

	{{#if post.meta.image}}
		<meta itemprop="image" content="{{config.blog.url}}/images{{svg-as-png post.meta.image}}">
		<meta property="og:image" content="{{config.blog.url}}/images{{svg-as-png post.meta.image}}">
	{{else if config.blog.banner}}
		<meta itemprop="image" content="{{config.blog.url}}/images{{svg-as-png config.blog.banner}}">
		<meta property="og:image" content="{{config.blog.url}}/images{{svg-as-png config.blog.banner}}">
	{{/if}}

	{{#if post.history.length}}
		<meta property="article:modified_time" content="{{date-iso post.history.0.date}}">
		<meta property="og:updated_time" content="{{date-iso post.history.0.date}}">
	{{/if}}

{{else}}
	<meta property="og:type" content="website">

	{{#if config.blog.banner}}
		<meta itemprop="image" content="{{config.blog.url}}/images{{svg-as-png config.blog.banner}}">
		<meta property="og:image" content="{{config.blog.url}}/images{{svg-as-png config.blog.banner}}">
	{{/if}}
{{/if}}
*/}

      {/* Twitter meta tags (that are not already covered by OpenGraph) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tim_roes" />
    	<meta name="twitter:creator" content="@tim_roes" />
    </Helmet>
  );
}

export const Meta = (props: Omit<MetaComponentProps, 'siteTitle'>) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <MetaComponent siteTitle={data.site.siteMetadata.title} {...props} />}
  />
);
