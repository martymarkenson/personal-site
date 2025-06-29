import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import logoCS from '@/images/logos/codingscape_logo.jpeg'

// Client logos - using existing ones as placeholders
import logoZappos from '@/images/logos/makerbot_logo.jpg'
import logoTwilio from '@/images/logos/ptcinc_logo.jpeg' 
import logoTinder from '@/images/logos/outliant_logo.jpeg'
import logoReddit from '@/images/logos/cognizant_logo.jpeg'
import logoAmazon from '@/images/logos/vibemetaverse_logo.jpg'

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
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src={logoCS}
                alt="Codingscape"
                className="h-8 w-8 rounded-full"
                unoptimized
              />
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-500 transition-colors">
                codingscape
              </span>
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            <nav className="flex items-center gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              <Link href="/" className="hover:text-red-500 transition-colors">
                Personal Site
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}

function Hero() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl lg:text-7xl">
          Consultants that actually{' '}
          <span className="text-red-500">build software</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Senior product and engineering experts who design scalable software 
          solutions faster than you can hire
        </p>
        <div className="mt-10">
          <Button 
            href="#projects" 
            className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 flex items-center gap-2 text-lg px-8 py-4"
          >
            SEE WHAT WE BUILT
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Container>
  )
}

function CompaniesSection() {
  const companies = [
    { name: 'Zappos', logo: logoZappos },
    { name: 'Twilio', logo: logoTwilio },
    { name: 'Tinder', logo: logoTinder },
    { name: 'Reddit', logo: logoReddit },
    { name: 'Amazon', logo: logoAmazon },
  ]

  return (
    <Container className="mt-32">
      <div className="text-center">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
          COMPANIES WE WORK WITH
        </h2>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60">
          {companies.map((company) => (
            <div key={company.name} className="flex items-center justify-center">
              <Image
                src={company.logo}
                alt={company.name}
                className="h-8 w-auto max-w-[120px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

function ProjectsSection() {
  const projects = [
    {
      title: "E-commerce Platform Redesign",
      description: "Complete platform overhaul with 40% conversion improvement",
      tech: "Next.js, Stripe, PostgreSQL",
      timeline: "6 weeks",
    },
    {
      title: "Real-time Analytics Dashboard", 
      description: "Custom analytics solution processing 1M+ events daily",
      tech: "React, Node.js, Redis",
      timeline: "4 weeks",
    },
    {
      title: "Mobile App MVP",
      description: "From concept to App Store with user authentication and payments", 
      tech: "React Native, Firebase",
      timeline: "8 weeks",
    }
  ]

  return (
    <Container className="mt-32" id="projects">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Recent Projects
        </h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Production-ready software delivered on time, every time
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="rounded-2xl border border-zinc-100 dark:border-zinc-700/40 p-8 hover:border-red-200 dark:hover:border-red-800/40 transition-colors"
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              {project.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              {project.description}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <CodeIcon className="h-4 w-4 text-red-500" />
                <span className="text-zinc-500 dark:text-zinc-400">{project.tech}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-zinc-500 dark:text-zinc-400">{project.timeline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

function AboutSection() {
  return (
    <Container className="mt-32">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Why Codingscape?
          </h2>
          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  We Actually Ship Code
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  No endless meetings or presentations. You get working software every week that your team can review and iterate on.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Production Ready
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Built with modern frameworks your team already knows. Deployed to platforms like Vercel with proper monitoring and error handling.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Fixed Timeline & Budget
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  We scope projects in 4-8 week sprints with fixed pricing. No scope creep, no surprise costs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 lg:mt-0">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-red-500 mb-4">6</div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Weeks Average</div>
              <div className="text-zinc-600 dark:text-zinc-400">From idea to production</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

function ContactSection() {
  return (
    <Container className="mt-32">
      <div className="text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-3xl p-12">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl mb-6">
          Ready to build something amazing?
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
          Let's discuss your project and see how we can help you ship faster than your team estimated.
        </p>
        <Button 
          href="/#contact-form"
          className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 text-lg px-8 py-4"
        >
          Start a Conversation
        </Button>
      </div>
    </Container>
  )
}

export default function Codingscape() {
  return (
    <>
      <Head>
        <title>Codingscape - Consultants that actually build software</title>
        <meta
          name="description"
          content="Senior product and engineering experts who design scalable software solutions faster than you can hire. Production-ready code delivered in weeks, not months."
        />
      </Head>
      
      <div className="min-h-screen bg-white dark:bg-zinc-900">
        <CodingscapeHeader />
        <Hero />
        <CompaniesSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        
        {/* Footer */}
        <footer className="mt-32 border-t border-zinc-100 dark:border-zinc-700/40">
          <Container className="py-16">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-3">
                <Image
                  src={logoCS}
                  alt="Codingscape"
                  className="h-6 w-6 rounded-full"
                  unoptimized
                />
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  &copy; {new Date().getFullYear()} Codingscape. Built by{' '}
                  <Link href="/" className="text-red-500 hover:text-red-600 transition-colors">
                    Marty Markenson
                  </Link>
                </span>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </>
  )
}