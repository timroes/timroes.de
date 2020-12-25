import React from 'react';
import className from 'classnames';

import css from './infobox.module.less';

interface Props {
  type?: 'info' | 'warn';
  title?: string;
}

export const Infobox: React.FC<Props> = ({ type, title, children }) => {
  return (
    <div className={className(css.infobox, css[type ?? 'info'])}>
      {title && <span className={css.infobox__title}>{title}</span>}
      {children}
    </div>
  );
};
