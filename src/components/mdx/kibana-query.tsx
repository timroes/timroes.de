import React, { memo } from 'react';
import className from 'classnames';

import css from './kibana-query.module.less';

interface Props {
  kql?: string | number | false;
  lucene?: string | false;
}

function trimLines(str: string): string[] {
  return str.replace(/\s*$/gm, '').replace(/^\s*/gm, '').split('\n');
}

const Query: React.FC<{ query: string }> = memo(({ query }) => {
  return (
    <React.Fragment>
      {trimLines(query).map((line, index) => {
        if (/^[^\w"]/.test(line)) {
          return (
            <div key={index} className={css.kibQuery__queryInfoLine}>
              {line}
            </div>
          );
        } else {
          return <code key={index}>{line}</code>;
        }
      })}
    </React.Fragment>
  );
});

export const KibanaQuery: React.FC<Props> = ({ children, kql, lucene }) => {
  return (
    <>
      <div className={css.kibQuery}>
        <div className={css.kibQuery__description}>
          <p>{children}</p>
        </div>
        <p className={css.kibQuery__queries}>
          {kql !== undefined && (
            <figure className={css.kibQuery__query}>
              <figcaption className={css.kibQuery__queryTypeKql}>KQL</figcaption>
              <pre
                className={className(css.kibQuery__queryKql, {
                  [css.kibQuery__queryValueUnsupported]: typeof kql !== 'string',
                })}
              >
                {kql === false && 'Not supported'}
                {typeof kql === 'string' && <Query query={kql} />}
                {typeof kql === 'number' && (
                  <>
                    Not (yet) supported (see{' '}
                    <a
                      href={`https://github.com/elastic/kibana/issues/${kql}`}
                      target="_blank"
                      rel="noopener nofollow noreferrer"
                    >
                      #{kql}
                    </a>
                    )
                  </>
                )}
              </pre>
            </figure>
          )}
          {lucene !== undefined && (
            <figure className={css.kibQuery__query}>
              <figcaption className={css.kibQuery__queryTypeLucene}>Lucene</figcaption>
              <pre
                className={className(css.kibQuery__queryLucene, {
                  [css.kibQuery__queryValueUnsupported]: lucene === false,
                })}
              >
                {lucene === false && 'Not supported'}
                {lucene !== false && <Query query={lucene} />}
              </pre>
            </figure>
          )}
        </p>
      </div>
    </>
  );
};
