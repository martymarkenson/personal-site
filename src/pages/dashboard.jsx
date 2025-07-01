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

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [workExperiences, setWorkExperiences] = useState([])
  const [projects, setProjects] = useState([])
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
    } catch (error) {
      console.error('Error loading data:', error)
      setError('Failed to load profile data')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const makeAuthenticatedRequest = async (url, options = {}) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      throw new Error('No active session')
    }

    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
        ...options.headers,
      },
    })
  }

  const handleProfileSave = async (profileData) => {
    setSaving(true)
    setError('')

    try {
      const response = await makeAuthenticatedRequest('/api/profile', {
        method: 'POST',
        body: JSON.stringify(profileData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save profile')
      }

      setProfile(data.profile)
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
      const response = await makeAuthenticatedRequest('/api/work-experiences', {
        method: 'POST',
        body: JSON.stringify({ ...workData, order_index: workExperiences.length }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add work experience')
      }

      setWorkExperiences([...workExperiences, data.workExperience])
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
      const response = await makeAuthenticatedRequest('/api/work-experiences', {
        method: 'PUT',
        body: JSON.stringify(workData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update work experience')
      }

      setWorkExperiences(workExperiences.map(exp => 
        exp.id === workData.id ? data.workExperience : exp
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
      const response = await makeAuthenticatedRequest('/api/work-experiences', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete work experience')
      }

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
        await makeAuthenticatedRequest('/api/work-experiences', {
          method: 'PUT',
          body: JSON.stringify({ id: item.id, order_index: item.order_index }),
        })
      } catch (error) {
        console.error('Failed to update order:', error)
      }
    }
  }

  const handleProjectAdd = async (projectData) => {
    setSaving(true)
    setError('')

    try {
      const response = await makeAuthenticatedRequest('/api/projects', {
        method: 'POST',
        body: JSON.stringify({ ...projectData, order_index: projects.length }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add project')
      }

      setProjects([...projects, data.project])
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
      const response = await makeAuthenticatedRequest('/api/projects', {
        method: 'PUT',
        body: JSON.stringify(projectData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update project')
      }

      setProjects(projects.map(proj => 
        proj.id === projectData.id ? data.project : proj
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
      const response = await makeAuthenticatedRequest('/api/projects', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete project')
      }

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
        await makeAuthenticatedRequest('/api/projects', {
          method: 'PUT',
          body: JSON.stringify({ id: item.id, order_index: item.order_index }),
        })
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
        </div>
      </Container>
    </>
  )
}