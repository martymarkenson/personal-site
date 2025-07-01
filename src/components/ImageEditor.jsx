import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/Button'
import Image from 'next/future/image'

export function ImageEditor({ images, onImagesChange, isLoading }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileUpload = async (event) => {
    try {
      setUploading(true)
      setError('')

      const file = event.target.files?.[0]
      if (!file) return

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB')
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image')
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(fileName, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('Image storage is not configured. Please contact support.')
        }
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-images')
        .getPublicUrl(fileName)

      // Save to database
      const { data: imageData, error: dbError } = await supabase
        .from('user_images')
        .insert({
          user_id: user.id,
          url: publicUrl,
          alt_text: file.name.split('.')[0],
          order_index: images.length,
        })
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
        // Try to clean up the uploaded file if database insert fails
        try {
          await supabase.storage.from('user-images').remove([fileName])
        } catch (cleanupError) {
          console.warn('Could not clean up uploaded file:', cleanupError)
        }
        throw new Error(`Failed to save image info: ${dbError.message}`)
      }

      // Update local state
      onImagesChange([...images, imageData])

    } catch (error) {
      setError(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (imageId, imageUrl) => {
    try {
      setError('')
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Delete from database
      const { error: dbError } = await supabase
        .from('user_images')
        .delete()
        .eq('id', imageId)
        .eq('user_id', user.id)

      if (dbError) throw dbError

      // Extract file path from URL and delete from storage
      try {
        const url = new URL(imageUrl)
        const pathParts = url.pathname.split('/')
        const fileName = pathParts[pathParts.length - 1]
        const filePath = `${user.id}/${fileName}`
        
        await supabase.storage
          .from('user-images')
          .remove([filePath])
      } catch (storageError) {
        console.warn('Could not delete file from storage:', storageError)
      }

      // Update local state
      onImagesChange(images.filter(img => img.id !== imageId))

    } catch (error) {
      setError(error.message)
    }
  }

  const handleReorder = async (reorderedImages) => {
    try {
      // Update local state immediately
      onImagesChange(reorderedImages)

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Update order in database
      for (const image of reorderedImages) {
        await supabase
          .from('user_images')
          .update({ order_index: image.order_index })
          .eq('id', image.id)
          .eq('user_id', user.id)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Profile Images
        </h2>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading || isLoading}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={`inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-100 cursor-pointer transition-colors ${
              uploading || isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </label>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Upload images for your profile photo gallery. Images will be displayed in the order shown below.
        Maximum file size: 5MB. First 5 images will be shown on your profile.
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg">
          <p className="text-zinc-500 dark:text-zinc-400">
            No images uploaded yet. Upload your first image to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={image.url}
                  alt={image.alt_text || `Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                  unoptimized
                />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  onClick={() => handleDelete(image.id, image.url)}
                  className="!bg-red-500 !text-white !p-1 !min-w-0 !h-8 !w-8 rounded-full"
                  title="Delete image"
                >
                  ×
                </Button>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}