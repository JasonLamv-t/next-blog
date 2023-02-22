import author from '#/meta/author';
import siteData from '#/meta/site';
import { BlogMeta } from '@/types/blog';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const additionalLinkTags = [
  {
    rel: 'shortcut icon',
    href: siteData.url + '/favicon.ico',
  },
  {
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css',
    integrity:
      'sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC',
    crossOrigin: 'anonymous',
  },
];

const twitter = {
  handle: `@${author.social.twitter}`,
  site: `@${author.social.twitter}`,
  cardType: 'summary_large_image',
};

export const CommonSEO = ({
  title = siteData.title,
  description = siteData.description,
}: {
  title?: string;
  description?: string;
}) => {
  const url = siteData.url + useRouter().asPath;
  const isIndex = useRouter().pathname === '/index';

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      additionalLinkTags={additionalLinkTags}
      twitter={twitter}
      openGraph={{
        title: title,
        description: description,
        url,
        type: 'website',
        images: [
          {
            url: siteData.url + siteData.banner,
          },
        ],
      }}
    />
  );
};

export const BlogSEO = ({
  title,
  summary,
  date,
  tags,
}: Pick<BlogMeta, 'title' | 'summary' | 'date' | 'tags'>) => {
  const url = siteData.url + useRouter().asPath;
  const time = new Date(date).toISOString();

  return (
    <NextSeo
      title={title}
      description={summary}
      canonical={url}
      additionalLinkTags={additionalLinkTags}
      twitter={twitter}
      openGraph={{
        title,
        description: summary,
        url,
        type: 'article',
        article: {
          publishedTime: time,
          authors: [siteData.url + '/about'],
          tags: tags,
        },
      }}
    />
  );
};
