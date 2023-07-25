import rehypeCodeTitle from '@jasonlamv-t/rehype-code-title';
import { IconLink } from '@tabler/icons-react';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { h } from 'hastscript';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Element } from 'rehype-autolink-headings/lib';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkSlug from 'remark-slug';
import siteData from './data/meta/site';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    pinned: { type: 'boolean', required: false, default: false },
    draft: { type: 'boolean', required: false, default: false },
    tags: { type: 'list', required: true, of: { type: 'string' } },
    summary: { type: 'string', required: true },
    canonicalUrl: { type: 'string', required: false, default: '' },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => post.canonicalUrl ? `posts/${post.canonicalUrl}` : post._raw.flattenedPath },
  },
}));

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: `authors/**/*.mdx`,
  fields: {
    isDefault: { type: 'boolean', required: false, default: false }
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Author],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkSlug,
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'before',
          properties: {},
          content: () => [IconLink],
          group: () => h('.group.h-min.relative'),
          test: (node: Element) =>
            ['h2', 'h3'].includes(node.tagName) && !node.properties?.className,
        },
      ],
      rehypeCodeTitle,
      [
        rehypePrism,
        {
          ignoreMissing: true,
          showLineNumbers: siteData.showCodeLineNumbers ?? false,
        },
      ],
      rehypePresetMinify,
    ]
  }
});