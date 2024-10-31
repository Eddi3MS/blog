import { WEBSITE_HOST_URL } from '@/lib/constants'
import { allPosts } from 'contentlayer/generated'

import type { MDXComponents } from 'mdx/types'
import type { Metadata } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import NextImage from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) {
    return
  }

  const { title, description, date, url } = post

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      url: `${WEBSITE_HOST_URL}/posts/${url}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${WEBSITE_HOST_URL}/posts/${url}`,
    },
  }
}

// Define your custom MDX components.
const mdxComponents: MDXComponents = {
  a: ({ href, children }) => (
    <Link
      href={href as string}
      target="_blank"
      className="block [&:not(:last-of-type)]:mb-1"
    >
      {children}
    </Link>
  ),
  Image: (props) => <NextImage className="rounded-lg" {...props} />,
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) {
    notFound()
  }

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div className="flex flex-col items-center">
      <h1>{post.title}</h1>

      <article className="prose mt-8 dark:prose-invert">
        <MDXContent components={mdxComponents} />
      </article>
    </div>
  )
}

export default PostLayout
