import { WEBSITE_HOST_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { allPosts } from 'contentlayer/generated'
import type { MDXComponents } from 'mdx/types'
import type { Metadata } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import NextImage from 'next/image'
import Link from 'next/link'

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
      url: `${WEBSITE_HOST_URL}/artigos/${url}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${WEBSITE_HOST_URL}/artigos/${url}`,
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
  Image: ({ className, ...props }) => (
    <NextImage
      className={cn('mx-auto my-0 rounded-md', className)}
      {...props}
    />
  ),
  Youtube: ({ id, title }: { id: string; title: string }) => {
    return (
      <div>
        <iframe
          className="aspect-video w-full"
          src={'https://www.youtube.com/embed/' + id}
          title={title}
          allow="encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen={true}
          referrerPolicy="no-referrer"
          loading="lazy"
        ></iframe>
      </div>
    )
  },
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  const MDXContent = useMDXComponent(post.body.code)

  if (!post) {
    return (
      <>
        <p>not found</p>
      </>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h1>{post.title}</h1>
      <p className="mt-2 text-muted-foreground">{post.description}</p>

      <article className="prose mt-8 dark:prose-invert">
        <MDXContent components={mdxComponents} />
      </article>
    </div>
  )
}

export default PostLayout
