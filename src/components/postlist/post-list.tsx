import React, { useMemo } from 'react';
import { FixedObject } from 'gatsby-image';

import { PostCard } from '../postcard';

import css from './post-list.module.less';
import { CategoryName } from './category-name';

interface PostListProps {
  posts: Post[];
}

interface Category {
  id: string;
  posts: Array<Post['node']>;
}

export interface Post {
  node: {
    fields: {
      slug: string;
    },
    timeToRead: string;
    frontmatter: {
      title: string;
      category?: string;
      date: string;
      image: null | {
        childImageSharp: {
          fixed: FixedObject;
        }
      }
    }
  }
}

function CategoryHeader(props: { category: Category }) {
  return (
    <h2 id={props.category.id} className={css.categoryHeader}>
      <CategoryName id={props.category.id} />
    </h2>
  );
}

export function PostList({ posts }: PostListProps) {
  const categories = useMemo(() => {
    const categories: Category[] = [];
    posts.forEach(({ node: post }) => {
      const postCategory = post.frontmatter.category || 'misc';
      let cat = categories.find(c => c.id === postCategory);
      if (cat === undefined) {
        cat = { id: postCategory, posts: [] };
        categories.push(cat);
      }
      cat.posts.push(post);
    });
    return categories;
  }, [posts]);
  return (
    <div className={css.postlist}>
      <nav aria-label="Categories" className={css.categories}>
        <h2 className={css.categories__title}>Categories</h2>
        <ul className={css.categories__list}>
          {categories.map(category => (
            <li key={category.id}>
              <a href={`#${category.id}`} className={css.categories__link}>
                <CategoryName id={category.id} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Posts" className={css.postlist__list}>
        {categories.map(category => (
          <React.Fragment key={category.id}>
            <CategoryHeader category={category} />
            <ul className={css.postlist__posts}>
              { category.posts.map((post) => (
                <li key={post.fields.slug} className={css.postlist__entry}>
                  <PostCard
                    slug={post.fields.slug}
                    timeToRead={post.timeToRead}
                    {...post.frontmatter}
                  />
                </li>
              )) }
            </ul>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );

}
