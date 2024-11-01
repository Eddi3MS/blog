import { formatDate } from '@/lib/utils'
import { Post } from 'contentlayer/generated'
import Link from 'next/link'

export function PostCard(post: Post) {
  return (
    <Link
      className="link block min-w-full max-w-fit rounded-lg"
      href={post.url}
    >
      <article className="group relative min-h-full rounded-md bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-slate-800 hover:dark:bg-slate-700">
        <h3 className="text-lg font-semibold leading-tight">{post.title}</h3>
        <time
          dateTime={post.date}
          className="relative -top-1 text-xs font-semibold text-muted-foreground"
        >
          {formatDate(post.date)}
        </time>
        <p className="!mt-2 line-clamp-3 text-sm">{post.description}</p>
      </article>
    </Link>
  )
}
