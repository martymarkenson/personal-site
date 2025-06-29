import Link from 'next/link'
import Image from 'next/future/image'
import logoCS from '@/images/logos/codingscape_logo.jpeg'

import { Container } from '@/components/Container'
import { LinkedInIcon, TwitterIcon, SubstackIcon, GitHubIcon } from '@/components/SocialIcons'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="pt-10 pb-16">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex justify-center gap-4 mb-6">
                <a href="https://www.linkedin.com/in/marty-markenson-08b79058/" aria-label="LinkedIn" className="rounded-full border border-zinc-200 dark:border-zinc-700 w-10 h-10 flex items-center justify-center transition hover:border-teal-500">
                  <LinkedInIcon className="h-5 w-5 text-zinc-500" />
                </a>
                <a href="https://twitter.com/martymarkenson" aria-label="X" className="rounded-full border border-zinc-200 dark:border-zinc-700 w-10 h-10 flex items-center justify-center transition hover:border-teal-500">
                  <TwitterIcon className="h-5 w-5 text-zinc-500" />
                </a>
                <a href="https://martymarkenson.substack.com" aria-label="Substack" className="rounded-full border border-zinc-200 dark:border-zinc-700 w-10 h-10 flex items-center justify-center transition hover:border-teal-500">
                  <SubstackIcon className="h-5 w-5 text-zinc-500" />
                </a>
                <a href="https://github.com/martymarkenson" aria-label="GitHub" className="rounded-full border border-zinc-200 dark:border-zinc-700 w-10 h-10 flex items-center justify-center transition hover:border-teal-500">
                  <GitHubIcon className="h-5 w-5 text-zinc-500" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Image src={logoCS} alt="Codingscape" className="h-6 w-6 rounded-full" unoptimized />
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  &copy; {new Date().getFullYear()} Marty Markenson. All rights
                  reserved.
                </p>
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
