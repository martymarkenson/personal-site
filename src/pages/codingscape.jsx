import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'
import { useState } from 'react'

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
import logoLinktodonate from '@/images/logos/linktodonate_logo.jpg'
import logoVermontTechMeetup from '@/images/logos/meetup_logo.png'
import underline from '@/images/underline.svg'
import cross from '@/images/cross-2.svg'

import { formatDate } from '@/lib/formatDate'

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
        className="stroke-current"
      />
    </svg>
  )
}

function ArrowRightIcon(props) {
  return (
    <svg
      viewBox="0 0 16 16" 
      fill="none" 
      aria-hidden="true" 
      {...props}
    >
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      />
    </svg>
  )
}

function CodingscapeHeader() {
  return (
    <header className="relative z-50 flex flex-col">
      <Container className="top-0 z-10 h-16 pt-6">
        <div className="relative flex gap-4">
          <div className="flex flex-1 items-center">
            <div className="flex items-center gap-3">
              <Image
                src={logoCS}
                alt="Codingscape"
                className="h-8 w-8 rounded-full"
                unoptimized
              />
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                Codingscape <span className="text-red-500">×</span> Marty Markenson
              </span>
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/marty-markenson-08b79058/" aria-label="LinkedIn" className="text-zinc-500 hover:text-red-500 transition">
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/martymarkenson" aria-label="X" className="text-zinc-500 hover:text-red-500 transition">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="https://martymarkenson.substack.com" aria-label="Substack" className="text-zinc-500 hover:text-red-500 transition">
                <SubstackIcon className="h-5 w-5" />
              </a>
              <a href="https://github.com/martymarkenson" aria-label="GitHub" className="text-zinc-500 hover:text-red-500 transition">
                <GitHubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

function Hero() {
  return (
    <Container className="mt-8 sm:mt-12">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Your team said <span className="relative inline-block">
          <span className="relative z-0">6 months</span>
          <Image
            src={cross}
            className="pointer-events-none absolute left-[18%] -bottom-7 sm:-bottom-9 w-[120px] sm:w-[160px] h-auto z-50"
            alt=""
            aria-hidden="true"
          />
        </span>.<br/>I&apos;ll ship it in <span className="relative inline-block">
          <span className="relative z-10 text-red-500">6 weeks</span>
          <Image
            src={underline}
            className="pointer-events-none absolute left-[55%] -translate-x-1/2 -bottom-10 w-[140px] h-auto mix-blend-multiply"
            alt=""
            aria-hidden="true"
            style={{ filter: 'hue-rotate(320deg) saturate(1.5)' }}
          />
        </span>.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          I&apos;m Marty, a product manager who writes code. I&apos;ll figure out what your users actually need and build software that fits into your roadmap.
        </p>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Every week you&apos;ll see working software, not presentations.
        </p>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          With 10 years of experience building for billion dollar companies and startups, you&apos;ll get production ready software (NextJS and Vercel) so your team can maintain it.
        </p>
        <div className="mt-8">
          <Button
            href="#contact-form"
            className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 flex items-center justify-center gap-2 text-lg font-semibold px-10 py-4 shadow-md shadow-zinc-800/5"
          >
             Let&apos;s talk specifics<span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </div>
    </Container>
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
      name: 'Recipe Saver',
      description: 'Save online recipes and ingredients from a link. Skip all the ads, lifestories and pop-ups',
      year: 'Mar 2025',
      href: 'https://v0-recipe-to-i-os-note.vercel.app/',
      logo: logoRecipe,
    },
    {
      name: 'Link to Donate',
      description: 'Link in bio for influencers easily promote their favorite charities.',
      year: 'Jan 2025',
      href: 'https://linktodonate.com',
      logo: logoLinktodonate,
    },
    {
      name: 'Bidtreat.com',
      description: 'Save up to 75% on luxury travel with weekly emails of the best vacations from charity auctions.',
      year: 'Dec 2024',
      href: 'https://bidtreat.com',
      logo: logoBidtreat,
    },
    {
      name: 'Vermont Tech Meetup',
      description: 'Organizer of the Vermont Tech Meetup, a monthly meetup for techies in Vermont.',
      year: 'Mar 2022',
      href: 'https://www.meetup.com/vermont-tech-meetup/',
      logo: logoVermontTechMeetup,
    },
    {
      name: 'Cavelit',
      description: 'AI powered video script generator and editor for realtors.',
      year: 'Jul 2020',
      href: 'https://martymarkenson.substack.com/p/i-shut-down-my-online-business',
      logo: logoCavelit,
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <CodeIcon className="h-6 w-6 flex-none text-red-500" />
        <span className="ml-3">Projects</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {projects.map((project, projectIndex) => (
          <li key={projectIndex} className="flex gap-4 min-h-[72px]">
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
                <Link href={project.href} className="hover:text-red-500 transition-colors">
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

function SendIcon(props) {
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
        d="M5 12h14M12 5l7 7-7 7"
        className="stroke-current"
      />
    </svg>
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
        <BriefcaseIcon className="h-6 w-6 flex-none text-red-500" />
        <span className="ml-3">Work Experience</span>
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
    </div>
  )
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('https://submit-form.com/Yl4JDoOAD', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        e.target.reset()
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <MailIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Message sent!</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Thank you for reaching out. I&apos;ll get back to you soon!
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Get in touch</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life.
      </p>
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            aria-label="Name"
            required
            disabled={isSubmitting}
            className="min-w-0 appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-red-400 dark:focus:ring-red-400/10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            aria-label="Email address"
            required
            disabled={isSubmitting}
            className="min-w-0 appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-red-400 dark:focus:ring-red-400/10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          aria-label="Message"
          required
          rows={4}
          disabled={isSubmitting}
          className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-red-400 dark:focus:ring-red-400/10 sm:text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-start">
          <Button 
            type="submit" 
            className="flex-none bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send message
                <SendIcon className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default function Codingscape() {
  return (
    <>
      <Head>
        <title>Marty Markenson - Codingscape</title>
        <meta
          name="description"
          content="I'm Marty, a product manager who writes code. I'll figure out what your users actually need and build software that fits into your roadmap."
        />
      </Head>
      
      <div className="min-h-screen bg-white dark:bg-zinc-900">
        <CodingscapeHeader />
        <Hero />
        <Photos />
        <Container className="mt-24 md:mt-28">
          <div className="mx-auto max-w-xl space-y-10">
            <Projects />
            <Resume />
            <div id="contact-form">
              <ContactForm />
            </div>
          </div>
        </Container>
        
        {/* Footer */}
        <footer className="mt-32 border-t border-zinc-100 dark:border-zinc-700/40">
          <Container className="py-16">
            <div className="flex items-center justify-center gap-3">
              <Image
                src={logoCS}
                alt="Codingscape"
                className="h-6 w-6 rounded-full"
                unoptimized
              />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} Marty Markenson. All rights reserved.
              </span>
            </div>
          </Container>
        </footer>
      </div>
    </>
  )
}