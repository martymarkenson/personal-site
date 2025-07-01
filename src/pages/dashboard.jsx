import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ProfileEditor } from '@/components/ProfileEditor'
import { WorkExperienceEditor } from '@/components/WorkExperienceEditor'
import { ProjectEditor } from '@/components/ProjectEditor'
import { ImageEditor } from '@/components/ImageEditor'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [workExperiences, setWorkExperiences] = useState([])
  const [projects, setProjects] = useState([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }

      setUser(session.user)
      await loadData(session.user.id)
    } catch (error) {
      console.error('Error checking user:', error)
      setError('Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  const loadData = async (userId) => {
    try {
      // Load profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      setProfile(profileData)

      // Load work experiences
      const { data: workData } = await supabase
        .from('work_experiences')
        .select('*')
        .eq('user_id', userId)
        .order('order_index', { ascending: true })
      
      setWorkExperiences(workData || [])

      // Load projects
      const { data: projectData } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('order_index', { ascending: true })
      
      setProjects(projectData || [])

      // Load images
      const { data: imageData } = await supabase
        .from('user_images')
        .select('*')
        .eq('user_id', userId)
        .order('order_index', { ascending: true })
      
      setImages(imageData || [])
    } catch (error) {
      console.error('Error loading data:', error)
      setError('Failed to load profile data')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleProfileSave = async (profileData) => {
    setSaving(true)
    setError('')

    try {
      // Check if username is already taken (if it's being changed)
      if (profileData.username && profileData.username !== profile?.username) {
        const { data: existingProfile } = await supabase
          .from('user_profiles')
          .select('user_id')
          .eq('username', profileData.username)
          .neq('user_id', user.id)
          .single()

        if (existingProfile) {
          throw new Error('Username is already taken')
        }
      }

      const profileDataWithUserId = {
        user_id: user.id,
        ...profileData,
      }

      const { data: savedProfile, error } = await supabase
        .from('user_profiles')
        .upsert(profileDataWithUserId, { onConflict: 'user_id' })
        .select()
        .single()

      if (error) throw error

      setProfile(savedProfile)
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleWorkExperienceAdd = async (workData) => {
    setSaving(true)
    setError('')

    try {
      // Clean the data to handle empty strings
      const cleanedData = {
        ...workData,
        start_date: workData.start_date || null,
        end_date: workData.end_date || null,
      }

      const { data: workExperience, error } = await supabase
        .from('work_experiences')
        .insert({
          user_id: user.id,
          ...cleanedData,
          order_index: workExperiences.length,
        })
        .select()
        .single()

      if (error) throw error

      setWorkExperiences([...workExperiences, workExperience])
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleWorkExperienceUpdate = async (workData) => {
    setSaving(true)
    setError('')

    try {
      // Clean the data to handle empty strings
      const cleanedData = {
        ...workData,
        start_date: workData.start_date || null,
        end_date: workData.end_date || null,
      }

      const { data: workExperience, error } = await supabase
        .from('work_experiences')
        .update(cleanedData)
        .eq('id', workData.id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error

      setWorkExperiences(workExperiences.map(exp => 
        exp.id === workData.id ? workExperience : exp
      ))
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleWorkExperienceDelete = async (id) => {
    setSaving(true)
    setError('')

    try {
      const { error } = await supabase
        .from('work_experiences')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      setWorkExperiences(workExperiences.filter(exp => exp.id !== id))
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleWorkExperienceReorder = async (reorderedItems) => {
    setWorkExperiences(reorderedItems)
    
    // Update order in database
    for (const item of reorderedItems) {
      try {
        await supabase
          .from('work_experiences')
          .update({ order_index: item.order_index })
          .eq('id', item.id)
          .eq('user_id', user.id)
      } catch (error) {
        console.error('Failed to update order:', error)
      }
    }
  }

  const handleProjectAdd = async (projectData) => {
    setSaving(true)
    setError('')

    try {
      const { data: project, error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          ...projectData,
          order_index: projects.length,
        })
        .select()
        .single()

      if (error) throw error

      setProjects([...projects, project])
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleProjectUpdate = async (projectData) => {
    setSaving(true)
    setError('')

    try {
      const { data: project, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', projectData.id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error

      setProjects(projects.map(proj => 
        proj.id === projectData.id ? project : proj
      ))
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleProjectDelete = async (id) => {
    setSaving(true)
    setError('')

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      setProjects(projects.filter(proj => proj.id !== id))
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleProjectReorder = async (reorderedItems) => {
    setProjects(reorderedItems)
    
    // Update order in database
    for (const item of reorderedItems) {
      try {
        await supabase
          .from('projects')
          .update({ order_index: item.order_index })
          .eq('id', item.id)
          .eq('user_id', user.id)
      } catch (error) {
        console.error('Failed to update order:', error)
      }
    }
  }

  if (loading) {
    return (
      <Container className="mt-16 sm:mt-32">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Loading dashboard...</p>
        </div>
      </Container>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard - Personal Site Platform</title>
      </Head>
      
      <Container className="mt-16 sm:mt-32">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
              Dashboard
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Welcome back, {user?.email}
            </p>
          </div>
          <div className="flex space-x-4">
            {profile?.username && (
              <Link href={`/${profile.username}`}>
                <Button variant="secondary">
                  View Profile
                </Button>
              </Link>
            )}
            <Button onClick={handleSignOut} variant="secondary">
              Sign Out
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-zinc-200 dark:border-zinc-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'profile', name: 'Profile' },
              { id: 'experience', name: 'Work Experience' },
              { id: 'projects', name: 'Projects' },
              { id: 'images', name: 'Images' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'profile' && (
            <ProfileEditor
              profile={profile}
              onSave={handleProfileSave}
              isLoading={saving}
            />
          )}

          {activeTab === 'experience' && (
            <WorkExperienceEditor
              experiences={workExperiences}
              onAdd={handleWorkExperienceAdd}
              onUpdate={handleWorkExperienceUpdate}
              onDelete={handleWorkExperienceDelete}
              onReorder={handleWorkExperienceReorder}
              isLoading={saving}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectEditor
              projects={projects}
              onAdd={handleProjectAdd}
              onUpdate={handleProjectUpdate}
              onDelete={handleProjectDelete}
              onReorder={handleProjectReorder}
              isLoading={saving}
            />
          )}

          {activeTab === 'images' && (
            <ImageEditor
              images={images}
              onImagesChange={setImages}
              isLoading={saving}
            />
          )}
        </div>
      </Container>
    </>
  )
}