import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Button } from '@/components/Button'

function WorkExperienceForm({ experience, onSave, onCancel, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      company: experience?.company || '',
      title: experience?.title || '',
      start_date: experience?.start_date || '',
      end_date: experience?.end_date || '',
      description: experience?.description || '',
      logo_url: experience?.logo_url || '',
    }
  })

  const onSubmit = (data) => {
    onSave({ ...data, id: experience?.id })
  }

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-800/50">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Company *
            </label>
            <input
              type="text"
              {...register('company', { required: 'Company is required' })}
              className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
              placeholder="Company name"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
              placeholder="Your role"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Start Date *
            </label>
            <input
              type="date"
              {...register('start_date', { required: 'Start date is required' })}
              className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            />
            {errors.start_date && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.start_date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              {...register('end_date')}
              className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Leave empty if current role
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Logo URL
          </label>
          <input
            type="url"
            {...register('logo_url')}
            className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            {...register('description')}
            className="w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm resize-none"
            placeholder="What did you do in this role?"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : experience ? 'Update' : 'Add'} Experience
          </Button>
        </div>
      </form>
    </div>
  )
}

export function WorkExperienceEditor({ experiences, onAdd, onUpdate, onDelete, onReorder, isLoading }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(experiences)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order_index for all items
    const reorderedItems = items.map((item, index) => ({
      ...item,
      order_index: index
    }))

    onReorder(reorderedItems)
  }

  const handleSave = async (data) => {
    if (data.id) {
      await onUpdate(data)
      setEditingId(null)
    } else {
      await onAdd(data)
      setIsAdding(false)
    }
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
  }

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Work Experience
        </h2>
        <Button
          onClick={() => setIsAdding(true)}
          disabled={isAdding || editingId || isLoading}
          className="text-sm"
        >
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {isAdding && (
          <WorkExperienceForm
            onSave={handleSave}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="work-experiences">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {experiences.map((experience, index) => (
                  <Draggable key={experience.id} draggableId={experience.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-white dark:bg-zinc-900 ${
                          snapshot.isDragging ? 'shadow-lg' : ''
                        }`}
                      >
                        {editingId === experience.id ? (
                          <WorkExperienceForm
                            experience={experience}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            isLoading={isLoading}
                          />
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div
                                {...provided.dragHandleProps}
                                className="mt-1 cursor-move text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM6 6h8v2H6V6zm8 4H6v2h8v-2zm-8 4h8v2H6v-2z" />
                                </svg>
                              </div>
                              
                              {experience.logo_url && (
                                <img
                                  src={experience.logo_url}
                                  alt={`${experience.company} logo`}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              )}
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                  {experience.company}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                  {experience.title}
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                                  {new Date(experience.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                                    experience.end_date 
                                      ? new Date(experience.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                                      : 'Present'
                                  }
                                </p>
                                {experience.description && (
                                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                                    {experience.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingId(experience.id)}
                                disabled={isAdding || editingId || isLoading}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 disabled:opacity-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => onDelete(experience.id)}
                                disabled={isAdding || editingId || isLoading}
                                className="text-red-400 hover:text-red-600 disabled:opacity-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {experiences.length === 0 && !isAdding && (
          <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}