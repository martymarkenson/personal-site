import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { supabase } from '@/lib/supabase'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Redirect to dashboard after successful login
      router.push('/dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
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

  return (
    <>
      <Head>
        <title>Login - Personal Site Platform</title>
      </Head>
      
      <Container className="mt-16 sm:mt-32">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-zinc-100 p-8 dark:border-zinc-700/40">
            <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">
              Login to your account
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
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
                  disabled={loading}
                  className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
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
                onClick={handleGoogleLogin}
                variant="secondary"
                className="w-full mt-4"
                disabled={loading}
              >
                Continue with Google
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-teal-600 hover:text-teal-500 dark:text-teal-400">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}