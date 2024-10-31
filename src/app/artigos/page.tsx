'use client'

import { PostCard } from '@/components/PostCard'
import { allPosts } from 'contentlayer/generated'
import { useState } from 'react'

export default function Page() {
  const [search, setSearch] = useState('')

  const filteredPosts = search
    ? allPosts.filter((p) => p.title.toLocaleLowerCase().includes(search))
    : allPosts

  return (
    <section>
      <header className="mb-8 flex flex-row justify-between gap-4">
        <h1 className="min-w-max text-2xl">Todos os artigos:</h1>
        <input
          type="search"
          className="min-w-0 rounded-md border-2 border-foreground px-2 outline-none focus:border-blue-500"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts
          .toSorted((a, b) => a.title.localeCompare(b.title))
          .map((p) => (
            <PostCard key={p._id} {...p} />
          ))}
      </div>
    </section>
  )
}
