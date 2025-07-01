import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  const { method, query: { username } } = req

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${method} Not Allowed` })
  }

  try {
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (profileError) {
      if (profileError.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found' })
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

    return res.status(200).json({
      profile,
      workExperiences,
      projects,
      images,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}