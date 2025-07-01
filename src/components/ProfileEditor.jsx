import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/Button'

export function ProfileEditor({ profile, onSave, isLoading }) {
  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
    defaultValues: {
      name: profile?.name || '',
      username: profile?.username || '',
      custom_title: profile?.custom_title || '',
      custom_subtext: profile?.custom_subtext || '',
    }
  })

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        username: profile.username || '',
        custom_title: profile.custom_title || '',
        custom_subtext: profile.custom_subtext || '',
      })
    }
  }, [profile, reset])

  const onSubmit = (data) => {
    onSave(data)
  }

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
        Profile Information
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Username *
          </label>
          <input
            id="username"
            type="text"
            {...register('username', { 
              required: 'Username is required',
              pattern: {
                value: /^[a-z0-9_]+$/,
                message: 'Username can only contain lowercase letters, numbers, and underscores'
              }
            })}
            className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            placeholder="your_username"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
          )}
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Your profile will be available at: yoursite.com/{register('username').name || 'username'}
          </p>
        </div>

        <div>
          <label htmlFor="custom_title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Custom Page Title
          </label>
          <input
            id="custom_title"
            type="text"
            {...register('custom_title')}
            className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            placeholder="Your team said 6 months. I'll ship it in 6 weeks."
          />
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            This will replace the default headline on your profile page. Leave blank to use the default.
          </p>
        </div>

        <div>
          <label htmlFor="custom_subtext" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Custom Subtext
          </label>
          <textarea
            id="custom_subtext"
            rows={3}
            {...register('custom_subtext')}
            className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm resize-none"
            placeholder="I'm a product manager who writes code. I'll figure out what your users actually need and build software that fits into your roadmap."
          />
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            This will replace the default subtext on your profile page. Leave blank to use the default format.
          </p>
        </div>


        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isDirty || isLoading}
            className="px-6"
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </div>
  )
}