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
        const { data: workExperiences, error } = await supabase
          .from('work_experiences')
          .select('*')
          .eq('user_id', user.id)
          .order('order_index', { ascending: true })

        if (error) throw error

        return res.status(200).json({ workExperiences })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case 'POST':
      try {
        const { company, title, logo_url, start_date, end_date, description, order_index } = req.body

        if (!company || !title || !start_date) {
          return res.status(400).json({ error: 'Company, title, and start_date are required' })
        }

        const workData = {
          user_id: user.id,
          company,
          title,
          logo_url,
          start_date,
          end_date,
          description,
          order_index: order_index || 0,
        }

        const { data: workExperience, error } = await supabase
          .from('work_experiences')
          .insert(workData)
          .select()
          .single()

        if (error) throw error

        return res.status(201).json({ workExperience })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case 'PUT':
      try {
        const { id, company, title, logo_url, start_date, end_date, description, order_index } = req.body

        if (!id) {
          return res.status(400).json({ error: 'Work experience ID is required' })
        }

        const updateData = {
          company,
          title,
          logo_url,
          start_date,
          end_date,
          description,
          order_index,
        }

        // Remove undefined values
        Object.keys(updateData).forEach(key => 
          updateData[key] === undefined && delete updateData[key]
        )

        const { data: workExperience, error } = await supabase
          .from('work_experiences')
          .update(updateData)
          .eq('id', id)
          .eq('user_id', user.id)
          .select()
          .single()

        if (error) throw error

        return res.status(200).json({ workExperience })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case 'DELETE':
      try {
        const { id } = req.body

        if (!id) {
          return res.status(400).json({ error: 'Work experience ID is required' })
        }

        const { error } = await supabase
          .from('work_experiences')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id)

        if (error) throw error

        return res.status(200).json({ message: 'Work experience deleted successfully' })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
}