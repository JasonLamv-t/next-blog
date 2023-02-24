import {
  Icon,
  IconBrandBilibili,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandWeibo,
  IconBrandYoutube,
  IconMail,
  IconRss,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { toString } from 'lodash-es';
import Link from 'next/link';

interface SocialLink {
  Icon: Icon;
  prefix?: string;
  suffix?: string;
}

const SocialLinks: { [key: string]: SocialLink } = {
  rss: { Icon: IconRss, prefix: '/rss.xml' },
  email: { Icon: IconMail, prefix: 'mailto:' },
  github: { Icon: IconBrandGithub, prefix: 'https://github.com/' },
  linkedin: { Icon: IconBrandLinkedin },
  twitter: { Icon: IconBrandTwitter, prefix: 'https://twitter.com/' },
  facebook: { Icon: IconBrandFacebook, prefix: 'https://www.facebook.com/' },
  youtube: { Icon: IconBrandYoutube, prefix: 'https://www.youtube.com/' },
  bilibili: { Icon: IconBrandBilibili, prefix: 'https://space.bilibili.com/' },
  weibo: { Icon: IconBrandWeibo },
  instagram: { Icon: IconBrandInstagram, prefix: 'https://www.instagram.com/' },
};

const SocialIconLink = ({
  platform,
  value,
  className,
}: {
  platform: string;
  value: string;
  className?: string;
}) => {
  const { Icon, prefix, suffix } = SocialLinks[platform];
  return (
    <Link
      href={toString(prefix) + value + toString(suffix)}
      className={clsx(className, 'w-6 h-6')}
    >
      <Icon />
    </Link>
  );
};

export default SocialIconLink;
