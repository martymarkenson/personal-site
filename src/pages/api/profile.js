import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  const { method } = req

  // Get the user from the authorization header
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ error: 'No authorization token provided' })
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser(token)
  
  if (userError || !user) {
    return res.status(401).json({ error: 'Invalid authorization token' })
  }

  switch (method) {
    case 'GET':
      try {
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          throw error
        }

        return res.status(200).json({ profile })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case 'POST':
    case 'PUT':
      try {
        const { username, name, custom_title, custom_subtext, avatar_url } = req.body

        // Check if username is already taken (if it's being changed)
        if (username) {
          const { data: existingProfile } = await supabase
            .from('user_profiles')
            .select('user_id')
            .eq('username', username)
            .neq('user_id', user.id)
            .single()

          if (existingProfile) {
            return res.status(400).json({ error: 'Username is already taken' })
          }
        }

        const profileData = {
          user_id: user.id,
          username,
          name,
          custom_title,
          custom_subtext,
          avatar_url,
        }

        const { data: profile, error } = await supabase
          .from('user_profiles')
          .upsert(profileData, { onConflict: 'user_id' })
          .select()
          .single()

        if (error) throw error

        return res.status(200).json({ profile })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case 'DELETE':
      try {
        const { error } = await supabase
          .from('user_profiles')
          .delete()
          .eq('user_id', user.id)

        if (error) throw error

        return res.status(200).json({ message: 'Profile deleted successfully' })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
}