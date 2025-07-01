import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/future/image'
import Link from 'next/link'
import clsx from 'clsx'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { 
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import logoCS from '@/images/logos/codingscape_logo.jpeg'
import cross from '@/images/cross-2.svg'

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

function Resume({ workExperiences }) {
  if (!workExperiences || workExperiences.length === 0) return null

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none text-red-500" />
        <span className="ml-3">Work Experience</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {workExperiences.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              {role.logo_url ? (
                <Image
                  src={role.logo_url}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                  width={28}
                  height={28}
                  unoptimized
                />
              ) : (
                <BriefcaseIcon className="h-4 w-4" />
              )}
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd className="ml-auto text-xs text-zinc-400">
                <time dateTime={role.start_date}>
                  {new Date(role.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end_date || 'present'}>
                  {role.end_date 
                    ? new Date(role.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : 'Present'
                  }
                </time>
              </dd>
              {role.description && (
                <dd className="w-full text-xs text-zinc-400 mt-2">
                  {role.description}
                </dd>
              )}
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Projects({ projects }) {
  if (!projects || projects.length === 0) return null

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-100">
        <CodeIcon className="h-6 w-6 flex-none text-red-500" />
        <span className="ml-3">Projects</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {projects.map((project, projectIndex) => (
          <li key={projectIndex} className="flex gap-4 min-h-[72px]">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              {project.logo_url ? (
                <Image
                  src={project.logo_url}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                  width={28}
                  height={28}
                  unoptimized
                />
              ) : (
                <CodeIcon className="h-4 w-4" />
              )}
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Project</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-100">
                {project.url ? (
                  <Link href={project.url} className="hover:text-red-500 transition-colors">
                    {project.name}
                  </Link>
                ) : (
                  project.name
                )}
              </dd>
              <dt className="sr-only">Description</dt>
              <dd className="text-xs text-zinc-400">
                {project.description}
              </dd>
              <dt className="sr-only">Year</dt>
              <dd className="ml-auto text-xs text-zinc-400">
                {project.year}
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Hero({ profile }) {

  return (
    <Container className="mt-9 w-full px-4">
      <div className="max-w-2xl">
        <div className="mb-8 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Image
              src={logoCS}
              alt="Codingscape"
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
              unoptimized
            />
            <span className="text-zinc-100 font-semibold text-base whitespace-nowrap">
              {profile.name} <span className="text-red-500">×</span> Codingscape
            </span>
          </div>
          <div className="hidden sm:flex gap-3 mt-2 sm:mt-0">
            {/* Social links can be added here if stored in profile */}
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          {profile.custom_title ? (
            profile.custom_title
          ) : (
            <>
              <span className="whitespace-nowrap">
                Your team said <span className="relative inline-block no-underline strikethrough-text">
                  <span className="relative z-0 no-underline strikethrough-text">6 months</span>
                </span>.
              </span><br/>I&apos;ll ship it in <span className="relative inline-block no-underline">
              <span className="relative z-10 no-underline">6 weeks</span>
            </span>.
            </>
          )}
        </h1>
        {profile.custom_subtext ? (
          <div className="mt-6 space-y-4 text-base text-zinc-400">
            {profile.custom_subtext.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index}>
                  {paragraph}
                </p>
              )
            ))}
          </div>
        ) : (
          <>
            <p className="mt-6 text-base text-zinc-400">
              I&apos;m {profile.name.split(' ')[0]}, a product manager who writes code. I&apos;ll figure out what your users actually need and build software that fits into your roadmap.
            </p>
            <p className="mt-4 text-base text-zinc-400">
              Every week you&apos;ll see working software, not presentations.
            </p>
            <p className="mt-4 text-base text-zinc-400">
              With 10 years of experience building for billion dollar companies and startups, you&apos;ll get production ready software (NextJS and Vercel) so your team can maintain it.
            </p>
          </>
        )}
        
        <div className="mt-8">
          <Button
            href="#contact-form"
            className="!bg-red-500 !border-2 !border-red-500 text-white font-mono font-bold text-base px-6 py-3 rounded-none tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-500 ease-out hover:!bg-white hover:!text-black hover:!border-red-500 active:!text-black group"
            style={{ letterSpacing: '0.15em' }}
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact-form');
              if (contactSection) {
                contactSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
          >
TALK WITH {profile.name.split(' ')[0].toUpperCase()}
            <SendIcon className="arrow-icon h-5 w-5 ml-2 transition-all duration-500 ease-out group-hover:!text-black text-white" />
          </Button>
        </div>
      </div>
    </Container>
  )
}

function Photos({ images }) {
  // Use user's images if available, otherwise use default photos
  const displayImages = images && images.length > 0 
    ? images.slice(0, 5).map(img => ({ src: img.url, alt: img.alt_text || '' }))
    : [image1, image2, image3, image4, image5].map(img => ({ src: img.src || img, alt: '' }))

  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {displayImages.map((image, imageIndex) => (
          <div
            key={imageIndex}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image.src}
              alt={image.alt || ''}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              width={288}
              height={320}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactForm({ profile }) {
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
      profileOwner: profile.name,
      profileUrl: window.location.href,
    }

    try {
      // You can replace this with your own form handler
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
        <h2 className="flex text-sm font-semibold text-zinc-100">
          <MailIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Message sent!</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Thank you for reaching out to {profile.name}. They&apos;ll get back to you soon!
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          className="mt-4 !bg-red-500 !hover:bg-red-600 !text-white !border-2 !border-black px-6 py-3"
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
      <h2 className="flex text-sm font-semibold text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Get in touch with {profile.name.split(' ')[0]}</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        Have a project in mind? Let&apos;s discuss how {profile.name.split(' ')[0]} can help bring your ideas to life.
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
            className="!bg-red-500 !border-2 !border-red-500 text-white font-mono font-bold text-base px-6 py-3 rounded-none tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:!bg-white hover:!text-black hover:!border-red-500 active:!text-black flex-none"
            style={{ letterSpacing: '0.15em' }}
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

export default function UserProfile({ profileData, notFound }) {
  useEffect(() => {
    // Force dark mode immediately to prevent flash
    document.documentElement.classList.add('dark');
    // Set custom background color
    document.documentElement.style.backgroundColor = '#00020E';
    document.body.style.backgroundColor = '#00020E';
    
    return () => {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  if (notFound) {
    return (
      <>
        <Head>
          <title>User Not Found</title>
        </Head>
        <div className="overflow-x-hidden min-h-screen" style={{ backgroundColor: '#00020E' }}>
          <Container className="mt-16 sm:mt-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
                Profile not found
              </h1>
              <p className="mt-6 text-base text-zinc-400">
                The profile you&apos;re looking for doesn&apos;t exist.
              </p>
              <Button href="/" className="mt-8">
                Go home
              </Button>
            </div>
          </Container>
        </div>
      </>
    )
  }

  const { profile, workExperiences, projects, images } = profileData

  return (
    <>
      <Head>
        <title>{profile.name} - {profile.title || 'Professional Profile'}</title>
        <meta
          name="description"
          content={profile.bio || `${profile.name}'s professional profile`}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                background-color: #00020E !important;
              }
              html {
                color-scheme: dark;
              }
              html.dark {
                background-color: #00020E !important;
              }
              .dark {
                background-color: #00020E !important;
              }
              /* Force dark mode text colors with higher specificity */
              .dark h1,
              .dark h1 *,
              .dark h1 span,
              .dark h1 span * {
                color: #f4f4f5 !important;
              }
              .dark h2,
              .dark h2 *,
              .dark h2 span,
              .dark h2 span * {
                color: #f4f4f5 !important;
              }
              .dark h3,
              .dark h3 *,
              .dark h3 span,
              .dark h3 span * {
                color: #f4f4f5 !important;
              }
              /* Target all heading and title text specifically */
              .dark .text-zinc-800,
              .dark span.text-zinc-800,
              .dark div.text-zinc-800,
              .dark * .text-zinc-800 {
                color: #f4f4f5 !important;
              }
              .dark .text-zinc-100,
              .dark span.text-zinc-100,
              .dark div.text-zinc-100,
              .dark * .text-zinc-100 {
                color: #f4f4f5 !important;
              }
              .dark .text-zinc-900,
              .dark span.text-zinc-900,
              .dark div.text-zinc-900,
              .dark * .text-zinc-900 {
                color: #f4f4f5 !important;
              }
              /* All font weights and variants */
              .dark .font-semibold,
              .dark .font-bold,
              .dark .font-medium {
                color: #f4f4f5 !important;
              }
              /* Keep paragraph text as intended */
              .dark p {
                color: #a1a1aa !important;
              }
              /* Override any conflicting Tailwind classes */
              .dark .text-zinc-600 {
                color: #a1a1aa !important;
              }
              .dark .text-zinc-400 {
                color: #a1a1aa !important;
              }
              .dark .text-zinc-500 {
                color: #a1a1aa !important;
              }
              /* Ensure labels and form elements have proper colors */
              .dark label,
              .dark dt,
              .dark dd {
                color: #f4f4f5 !important;
              }
              /* Button text colors */
              .dark button:not(.text-white),
              .dark a:not(.text-white) {
                color: #f4f4f5;
              }
              /* Remove any text decorations from title spans */
              .dark h1 span,
              .dark h1 span *,
              .dark span.relative,
              .dark span.inline-block,
              .dark h1,
              .dark h1 *,
              h1 span,
              h1 span *,
              span.relative,
              span.inline-block,
              .relative.inline-block,
              .relative.z-0,
              .relative.z-10 {
                text-decoration: none !important;
                text-decoration-line: none !important;
                text-underline-offset: 0 !important;
                border-bottom: none !important;
              }
              /* Specific targeting for strikethrough text */
              .strikethrough-text,
              .strikethrough-text *,
              span.strikethrough-text,
              span.strikethrough-text * {
                text-decoration: none !important;
                text-decoration-line: none !important;
                text-underline-offset: 0 !important;
                border-bottom: none !important;
                box-shadow: none !important;
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('dark');
                document.documentElement.style.backgroundColor = '#00020E';
                document.body.style.backgroundColor = '#00020E';
              })();
            `,
          }}
        />
        <link rel="icon" href="/codinscape.ico" type="image/x-icon" />
      </Head>
      <div className="overflow-x-hidden min-h-screen" style={{ backgroundColor: '#00020E' }}>
        <Hero profile={profile} />
        <Photos images={images} />
        <Container className="mt-24 md:mt-28 pb-16" style={{ backgroundColor: '#00020E' }}>
          <div className="mx-auto max-w-xl space-y-10">
            <Projects projects={projects} />
            <Resume workExperiences={workExperiences} />
            <div id="contact-form">
              <ContactForm profile={profile} />
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { username } = params

  try {
    // Import supabase here for server-side use
    const { createClient } = require('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (profileError) {
      if (profileError.code === 'PGRST116') {
        return {
          props: {
            notFound: true
          }
        }
      }
      throw profileError
    }

    // Get work experiences
    const { data: workExperiences, error: workError } = await supabase
      .from('work_experiences')
      .select('*')
      .eq('user_id', profile.user_id)
      .order('order_index', { ascending: true })

    if (workError) throw workError

    // Get projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', profile.user_id)
      .order('order_index', { ascending: true })

    if (projectsError) throw projectsError

    // Get images
    const { data: images, error: imagesError } = await supabase
      .from('user_images')
      .select('*')
      .eq('user_id', profile.user_id)
      .order('order_index', { ascending: true })

    if (imagesError) throw imagesError

    return {
      props: {
        profileData: {
          profile,
          workExperiences: workExperiences || [],
          projects: projects || [],
          images: images || [],
        }
      }
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
    return {
      props: {
        notFound: true
      }
    }
  }
}