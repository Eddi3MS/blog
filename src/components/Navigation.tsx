'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const Nav = () => {
  return (
    <>
      <Link href="/" className="nav-link">
        Inicio
      </Link>
      <Link href="/artigos" className="nav-link">
        Artigos
      </Link>
      <Link href="/artigos/coroa-das-lagrimas" className="nav-link">
        Coroa das Lágrimas
      </Link>
    </>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()
  const refPath = useRef<string>(pathname)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen && pathname !== refPath.current) {
      closeMenu()
      refPath.current = pathname
    }
  }, [pathname, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <nav className="flex flex-col md:flex-row md:gap-4">
      {/* mobile */}
      <div className="block lg:hidden">
        <button
          className="relative z-30 p-2"
          onClick={toggleMenu}
          aria-label="abrir menu de navegação"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div
          className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} absolute inset-0 z-10 flex h-[100dvh] transform flex-col items-center justify-center gap-4 bg-background transition-transform duration-300 ease-in-out`}
        >
          <Nav />
        </div>
      </div>

      {/* desktop */}
      <div className="hidden gap-4 lg:flex">
        <Nav />
      </div>
    </nav>
  )
}
