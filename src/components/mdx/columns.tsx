import React from 'react';

import css from './columns.module.less';

export const Columns: React.FC = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const columnSeparatorIndex = childrenArray.findIndex((el) => {
    return el && typeof el === 'object' && 'props' in el && el.props.originalType === 'hr';
  });
  if (columnSeparatorIndex === -1) {
    throw new Error(
      '<Column> component requires to have an hr element as a column separator inside.'
    );
  }
  const column1 = childrenArray.slice(0, columnSeparatorIndex);
  const column2 = childrenArray.slice(columnSeparatorIndex + 1);
  return (
    <div className={css.columns}>
      <div>{column1}</div>
      <div>{column2}</div>
    </div>
  );
};
