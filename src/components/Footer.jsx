import Link from 'next/link'
import Image from 'next/future/image'
import logoCS from '@/images/logos/codingscape_logo.jpeg'

import { Container } from '@/components/Container'

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
            <div className="flex justify-center">
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
