import Image from 'next/future/image'
import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoVibe from '@/images/logos/vibemetaverse_logo.jpg'
import logoRecipe from '@/images/logos/recipesaver_logo.png'
import logoBidtreat from '@/images/logos/bidtreat_logo.png'
import logoCavelit from '@/images/logos/cavelit_logo.jpg'

const projects = [
  {
    name: 'The Vibemetaverse',
    description: 'Vibecoded multiplayer metaverse that reached 200 daily users. Jump through 3D games with friends. Keep your avatar / name',
    link: {
      href: 'https://thevibemetaverse.com',
      label: 'thevibemetaverse.com',
    },
    logo: logoVibe,
  },
  {
    name: 'Recipe Saver',
    description: 'Save online recipes and ingredients from a link. Skip all the ads, lifestories and pop-ups',
    link: {
      href: 'https://v0-recipe-to-i-os-note.vercel.app/',
      label: 'v0-recipe-to-i-os-note.vercel.app',
    },
    logo: logoRecipe,
  },
  {
    name: 'Bidtreat.com',
    description: 'Save up to 75% on luxury travel with weekly emails of the best vacations from charity auctions.',
    link: {
      href: 'https://bidtreat.com',
      label: 'bidtreat.com',
    },
    logo: logoBidtreat,
  },
  {
    name: 'Cavelit',
    description: 'AI powered video script generator and editor for realtors.',
    link: {
      href: 'https://martymarkenson.substack.com/p/i-shut-down-my-online-business',
      label: 'martymarkenson.substack.com',
    },
    logo: logoCavelit,
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Victoria Jordan</title>
        <meta
          name="description"
          content="Things I've made trying to put my dent in the universe."
        />
      </Head>
      <SimpleLayout
        title="A couple of my favorite personal projects."
        intro="This summer, I learned about the trifecta that is React, Next.js, and TailwindCSS. I haven't looked back since!"
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-8 w-8 rounded-full"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
