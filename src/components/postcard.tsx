import React from 'react';
import { Link } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';
import className from 'classnames';

import css from './postcard.module.less';

import { ReactComponent as BannerPlaceholder } from '../images/banner-placeholder.svg';
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg';
import { ReactComponent as ClockIcon } from '../icons/clock.svg';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  timeToRead: string;
  image: null | {
    childImageSharp: {
      fixed: FixedObject;
    }
  }
  className?: string;
}

export function PostCard(props: PostCardProps) {
  const linkClass = className(css.postcard, props.className);
  return (
    <Link to={props.slug} className={linkClass}>
      { props.image ?
        <Img fixed={props.image.childImageSharp.fixed} className={css.postcard__banner} /> :
        <BannerPlaceholder className={css.postcard__banner} />
      }
      <div className={css.postcard__overlay}>
        <div className={css.postcard__title}>{props.title}</div>
        <div className={css.postcard__meta}>
          <span><CalendarIcon className={css.postcard__icon} /> {props.date}</span>
          <span><ClockIcon className={css.postcard__icon} /> {props.timeToRead} min read</span>
        </div>
      </div>
    </Link>
  );
}
