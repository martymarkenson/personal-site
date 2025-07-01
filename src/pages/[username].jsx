import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/future/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { 
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'

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
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function Resume({ workExperiences }) {
  if (!workExperiences || workExperiences.length === 0) return null

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
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
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
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
                <dd className="w-full text-xs text-zinc-500 dark:text-zinc-400 mt-2">
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
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <CodeIcon className="h-6 w-6 flex-none" />
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
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {project.url ? (
                  <Link href={project.url} className="hover:text-teal-500 transition-colors">
                    {project.name}
                  </Link>
                ) : (
                  project.name
                )}
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

export default function UserProfile({ profileData, notFound }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Container className="mt-16 sm:mt-32">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Loading profile...</p>
        </div>
      </Container>
    )
  }

  if (notFound) {
    return (
      <>
        <Head>
          <title>User Not Found</title>
        </Head>
        <Container className="mt-16 sm:mt-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Profile not found
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              The profile you're looking for doesn't exist.
            </p>
            <Button href="/" className="mt-8">
              Go home
            </Button>
          </div>
        </Container>
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
      </Head>
      
      <Container className="mt-9">
        <div className="max-w-2xl">
          <div className="mb-8 flex items-center justify-between w-full">
            <div className="text-zinc-800 dark:text-zinc-100 font-semibold text-base">
              {profile.name}
            </div>
            <div className="flex gap-3">
              {/* Add social links here if they're in the profile */}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {profile.title || profile.name}
          </h1>
          
          {profile.bio && (
            <div className="mt-6 text-base text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
              {profile.bio}
            </div>
          )}
        </div>
      </Container>

      {/* Display gallery images if available */}
      {images && images.length > 0 && (
        <div className="mt-16 sm:mt-20">
          <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
            {images.slice(0, 5).map((image, imageIndex) => (
              <div
                key={image.id}
                className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl"
              >
                <Image
                  src={image.url}
                  alt={image.alt_text || ''}
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
      )}

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto max-w-xl space-y-10">
          <Projects projects={projects} />
          <Resume workExperiences={workExperiences} />
        </div>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  // Return empty paths for now - profiles will be generated on-demand
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const { username } = params

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/public/${username}`)
    
    if (!response.ok) {
      return {
        props: {
          notFound: true
        },
        revalidate: 60 // Try again in 60 seconds
      }
    }

    const profileData = await response.json()

    return {
      props: {
        profileData
      },
      revalidate: 300 // Revalidate every 5 minutes
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
    return {
      props: {
        notFound: true
      },
      revalidate: 60
    }
  }
}