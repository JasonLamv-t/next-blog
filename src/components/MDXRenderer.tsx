import { BlogMeta } from '@/types/blog';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import Pre from './Pre';
import Note from './Note';
import Code from './Code';

export default function MDXRenderer({
  code,
  layout,
  meta,
}: {
  code: string;
  layout: 'ArticleLayout' | 'AuthorLayout';
  meta?: BlogMeta;
}) {
  const MDXContent = useMemo(() => getMDXComponent(code), [code]);
  const wrapper = require(`@/layouts/${layout}`).default;
  const components = {
    wrapper,
    pre: Pre,
    code: Code,
    Note: Note,
  };

  return <MDXContent components={components} {...meta} />;
}