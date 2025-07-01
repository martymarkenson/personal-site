import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { supabase } from '@/lib/supabase'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Check if username is available
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .single()

      if (existingUser) {
        throw new Error('Username is already taken')
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            name,
          },
        },
      })

      if (error) throw error

      setSuccess(true)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) throw error
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <>
        <Head>
          <title>Check Your Email - Personal Site Platform</title>
        </Head>
        
        <Container className="mt-16 sm:mt-32">
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-zinc-100 p-8 dark:border-zinc-700/40">
              <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
                Check your email
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We&apos;ve sent you a confirmation link at <strong>{email}</strong>. 
                Click the link to verify your account and start building your profile.
              </p>
              <Link href="/login" className="text-teal-600 hover:text-teal-500 dark:text-teal-400">
                Back to login
              </Link>
            </div>
          </div>
        </Container>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Sign Up - Personal Site Platform</title>
      </Head>
      
      <Container className="mt-16 sm:mt-32">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-zinc-100 p-8 dark:border-zinc-700/40">
            <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">
              Create your account
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  required
                  disabled={loading}
                  pattern="[a-z0-9_]+"
                  title="Username can only contain lowercase letters, numbers, and underscores"
                  className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  This will be your profile URL: yoursite.com/{username}
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                  className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Minimum 6 characters
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-300 dark:border-zinc-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignup}
                variant="secondary"
                className="w-full mt-4"
                disabled={loading}
              >
                Continue with Google
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Already have an account?{' '}
              <Link href="/login" className="text-teal-600 hover:text-teal-500 dark:text-teal-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}