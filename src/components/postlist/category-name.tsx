import React from 'react';

import { ReactComponent as KibanaIcon } from './category-icons/kibana.svg';
import { ReactComponent as GradleIcon } from './category-icons/gradle.svg';
import { ReactComponent as GroovyIcon } from './category-icons/groovy.svg';
import { ReactComponent as WebIcon } from './category-icons/web.svg';
import { ReactComponent as MiscIcon } from './category-icons/misc.svg';

import css from './category-name.module.less';

const CATEGORY_ICONS: { [key: string]: React.FC<React.HTMLProps<SVGElement>> } = {
  kibana: KibanaIcon,
  gradle: GradleIcon,
  groovy: GroovyIcon,
  web: WebIcon,
  misc: MiscIcon,
};

const CATEGORY_NAMES: { [key: string]: string } = {
  kibana: 'Kibana',
  gradle: 'Gradle',
  groovy: 'Groovy',
  web: 'Web Development',
  misc: 'Misc',
};

interface CategoryNameProps {
  id: string;
}

export function CategoryName({ id }: CategoryNameProps) {
  const Icon = CATEGORY_ICONS[id] || ((props: React.HTMLProps<SVGSVGElement>) => <svg viewBox="0 0 64 64" {...props}></svg>);
  return (
    <span className={css.categoryIcon}>
      <Icon className={css.categoryIcon__icon} />
      {CATEGORY_NAMES[id] || id}
    </span>
  )
}
