import { PostCard } from '@/components/PostCard'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  return (
    <div>
      <div className="flex gap-4">
        <Image
          src="/images/ns.jpg"
          width={160}
          height={240}
          alt="Imagem de Nossa Senhora"
          className="hidden aspect-[4/6] rounded-md md:block"
        />
        <div className="flex flex-1 flex-col justify-center">
          <h1>Sabaoth</h1>
          <p>Conteúdo Católico.</p>
        </div>
      </div>

      <div className="mt-8 space-y-8 border-t border-gray-200 pt-8 dark:border-gray-700">
        <div className="flex justify-between">
          <h2>Recentes:</h2>
          <Link
            href="/artigos"
            className="flex items-center gap-1 text-xs font-semibold text-blue-500 underline underline-offset-1 hover:text-blue-600"
          >
            ver mais
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}
