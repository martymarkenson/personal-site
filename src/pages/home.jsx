import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  SubstackIcon,
} from '@/components/SocialIcons'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import logoPTC from '@/images/logos/ptcinc_logo.jpeg'
import logoCS from '@/images/logos/codingscape_logo.jpeg'
import logoOutliant from '@/images/logos/outliant_logo.jpeg'
import logoMakerbot from '@/images/logos/makerbot_logo.jpg'
import logoCognizant from '@/images/logos/cognizant_logo.jpeg'
import logoVibe from '@/images/logos/vibemetaverse_logo.jpg'
import logoRecipe from '@/images/logos/recipesaver_logo.png'
import logoBidtreat from '@/images/logos/bidtreat_logo.png'
import logoCavelit from '@/images/logos/cavelit_logo.jpg'

import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  const isSubstack = Icon && Icon.name === 'SubstackIcon';
  const isLarge =
    Icon &&
    ["GitHubIcon", "LinkedInIcon", "TwitterIcon"].includes(Icon.name);
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className={
        isSubstack
          ? "h-6 w-6 fill-zinc-200 opacity-60 transition group-hover:fill-zinc-400 group-hover:opacity-100 dark:fill-zinc-100 dark:opacity-80 dark:group-hover:fill-zinc-300 dark:group-hover:opacity-100"
          : isLarge
            ? "h-7 w-7 fill-zinc-500 transition group-hover:fill-zinc-700 dark:fill-zinc-400 dark:group-hover:fill-zinc-100"
            : "h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-700 dark:fill-zinc-400 dark:group-hover:fill-zinc-100"
      } />
    </Link>
  );
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Codingscape',
      title: 'Product Manager',
      logo: logoCS,
      start: 'Feb 2025',
      end: 'Present',
    },
    {
      company: 'Outliant',
      title: 'Contract Product Manager',
      logo: logoOutliant,
      start: 'Jan 2024',
      end: 'May 2024',
    },
    {
      company: 'Makerbot',
      title: 'Contract Product Manager',
      logo: logoMakerbot,
      start: 'Jan 2022',
      end: 'Mar 2023',
    },
    {
      company: 'PTC',
      title: 'AR/VR Product Manager',
      logo: logoPTC,
      start: 'Dec 2016',
      end: 'Dec 2021',
    },
    {
      company: 'Cognizant',
      title: 'QA Analyst',
      logo: logoCognizant,
      start: 'Aug 2015',
      end: 'Mar 2016',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={role.logo}
                alt=""
                className="h-7 w-7 rounded-full"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      {/* <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button> */}
    </div>
  )
}

function CodeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M16 18l6-6-6-6M8 6l-6 6 6 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function Projects() {
  let projects = [
    {
      name: 'The Vibemetaverse',
      description: 'Vibecoded multiplayer metaverse that reached 200 daily users. Jump through 3D games with friends. Keep your avatar / name',
      year: 'Apr 2025',
      href: 'https://thevibemetaverse.com',
      logo: logoVibe,
    },
    {
      name: 'Receipe Saver',
      description: 'Save online receipes and ingredients from a link. Skip all the ads, lifestories and pop-ups',
      year: 'Mar 2025',
      href: 'https://receipesaver.com',
      logo: logoRecipe,
    },
    {
      name: 'Bidtreat.com',
      description: 'Save up to 75% on luxury travel with weekly emails of the best vacations from charity auctions.',
      year: 'Dec 2024',
      href: 'https://bidtreat.com',
      logo: logoBidtreat,
    },
    {
      name: 'Cavelit',
      description: 'AI powered video script generator and editor for realtors.',
      year: '2020-2024',
      href: 'https://cavelit.com',
      logo: logoCavelit,
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <CodeIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Projects</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {projects.map((project, projectIndex) => (
          <li key={projectIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-7 w-7 rounded-full"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Project</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                <Link href={project.href} className="hover:text-teal-500 transition-colors">
                  {project.name}
                </Link>
              </dd>
              <dt className="sr-only">Description</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {project.description}
              </dd>
              <dt className="sr-only">Year</dt>
              <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                {project.year}
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Marty Markenson</title>
        <meta
          name="description"
          content="I'm Victoria Jordan. A leader, artist, and frontend enthusiast"
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Product manager and vibecoder in Burlington, VT.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos;m Marty, a product manager, technology builder and
            photographer in Burlington, VT. I am
            passionate about building well designed products, and
            building a local tech community.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/martymarkenson"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/marty-markenson-08b79058/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="https://twitter.com/martymarkenson"
              aria-label="Follow on X"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://martymarkenson.substack.com"
              aria-label="Follow on Substack"
              icon={SubstackIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto max-w-xl space-y-10">
          <Projects />
          <Resume />
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
