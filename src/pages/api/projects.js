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
        const { data: projects, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('order_index', { ascending: true })

        if (error) throw error

        return res.status(200).json({ projects })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case 'POST':
      try {
        const { name, description, year, url, logo_url, order_index } = req.body

        if (!name) {
          return res.status(400).json({ error: 'Project name is required' })
        }

        const projectData = {
          user_id: user.id,
          name,
          description,
          year,
          url,
          logo_url,
          order_index: order_index || 0,
        }

        const { data: project, error } = await supabase
          .from('projects')
          .insert(projectData)
          .select()
          .single()

        if (error) throw error

        return res.status(201).json({ project })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case 'PUT':
      try {
        const { id, name, description, year, url, logo_url, order_index } = req.body

        if (!id) {
          return res.status(400).json({ error: 'Project ID is required' })
        }

        const updateData = {
          name,
          description,
          year,
          url,
          logo_url,
          order_index,
        }

        // Remove undefined values
        Object.keys(updateData).forEach(key => 
          updateData[key] === undefined && delete updateData[key]
        )

        const { data: project, error } = await supabase
          .from('projects')
          .update(updateData)
          .eq('id', id)
          .eq('user_id', user.id)
          .select()
          .single()

        if (error) throw error

        return res.status(200).json({ project })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case 'DELETE':
      try {
        const { id } = req.body

        if (!id) {
          return res.status(400).json({ error: 'Project ID is required' })
        }

        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id)

        if (error) throw error

        return res.status(200).json({ message: 'Project deleted successfully' })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
}