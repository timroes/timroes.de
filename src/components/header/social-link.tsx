import React, { HTMLProps } from 'react';
import { ReactComponent as GithubIcon } from '../../icons/github-icon.svg';
import { ReactComponent as TwitterIcon } from '../../icons/twitter-icon.svg';
import { ReactComponent as YoutubeIcon } from '../../icons/youtube-icon.svg';
import { ReactComponent as LinkedinIcon } from '../../icons/linkedin-square.svg';

import css from './social-link.module.less';

interface SocialLinkProps {
  Icon: React.FC<HTMLProps<SVGElement>>;
  label: string;
  url: string;
}

function SocialLink({ Icon, label, url }: SocialLinkProps) {
  return (
    <a
      href={url}
      rel="extern noopener noreferrer"
      aria-label={label}
      className={css.sociallink}
      title={label}
    >
      <Icon className={css.sociallink__icon} />
    </a>
  );
}

export const GitHubLink: React.FC = () => (
  <SocialLink Icon={GithubIcon} label="GitHub" url="https://github.com/timroes" />
);
export const TwitterLink: React.FC = () => (
  <SocialLink Icon={TwitterIcon} label="Twitter" url="https://twitter.com/tim_roes" />
);
export const YoutubeLink: React.FC = () => (
  <SocialLink Icon={YoutubeIcon} label="YouTube" url="https://youtube.com/TimRoes" />
);
export const LinkedinLink: React.FC = () => (
  <SocialLink Icon={LinkedinIcon} label="LinkedIn" url="https://www.linkedin.com/in/timroes/" />
);
