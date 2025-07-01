import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/Button'

export function ImageUpload({ onUpload, bucket, folder, currentImage }) {
  const [uploading, setUploading] = useState(false)

  const uploadImage = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = folder ? `${folder}/${fileName}` : fileName

      let { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      onUpload(data.publicUrl)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {currentImage && (
        <div className="flex items-center space-x-4">
          <img
            src={currentImage}
            alt="Current"
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Current image
          </div>
        </div>
      )}
      
      <div>
        <label htmlFor="image-upload" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Upload Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
          className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 dark:file:bg-teal-900/20 dark:file:text-teal-400 dark:hover:file:bg-teal-900/30 disabled:opacity-50"
        />
        {uploading && (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Uploading...
          </p>
        )}
      </div>
    </div>
  )
}