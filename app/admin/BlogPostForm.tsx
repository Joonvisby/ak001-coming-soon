'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Plus, Trash2 } from 'lucide-react'

interface BlogPostFormProps {
  onSubmit: (data: BlogPostData) => void
  onCancel: () => void
  initialData?: Partial<BlogPostData>
  isEditing?: boolean
  existingCategories?: string[]
  existingTags?: string[]
}

interface BlogPostData {
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  author: string
  tags: string[]
  featuredImage: string
  contentImages: string[]
}

export default function BlogPostForm({ onSubmit, onCancel, initialData, isEditing = false, existingCategories, existingTags }: BlogPostFormProps) {
  const [formData, setFormData] = useState<BlogPostData>({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    readTime: initialData?.readTime || '',
    author: initialData?.author || '',
    tags: initialData?.tags || [],
    featuredImage: initialData?.featuredImage || '',
    contentImages: initialData?.contentImages || [],
  })

  // Pre-populated options
  const defaultCategories = [
    'Venture Building', 
    'Consumer Brands', 
    'CPG', 
    'Innovation', 
    'Strategy', 
    'Market Trends', 
    'Business', 
    'Technology', 
    'Startup', 
    'Investment', 
    'Growth', 
    'Sustainability'
  ]
  const defaultTags = [
    'Venture Studio', 
    'Consumer Brands', 
    'CPG', 
    'Innovation', 
    'Strategy', 
    'Market Research', 
    'Brand Building', 
    'Startup', 
    'Investment', 
    'Growth', 
    'Sustainability', 
    'Digital Marketing', 
    'E-commerce', 
    'Food & Beverage', 
    'Health & Wellness',
    'Venture Capital',
    'Product Development',
    'Market Entry',
    'Brand Strategy',
    'Consumer Insights',
    'Retail',
    'DTC',
    'Supply Chain',
    'Packaging',
    'Regulatory',
    'International Expansion'
  ]
  
  const categories = existingCategories || defaultCategories
  const availableTags = existingTags || defaultTags

  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const contentImageInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof BlogPostData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Auto-calculate read time when content changes
    if (field === 'content') {
      const wordCount = (value as string).split(/\s+/).filter(word => word.length > 0).length
      const readingTime = Math.ceil(wordCount / 200) // Average reading speed: 200 words per minute
      setFormData(prev => ({ ...prev, readTime: `${readingTime} min read` }))
      
      // Auto-generate excerpt from content
      if (value && typeof value === 'string' && value.length > 50) {
        const words = value.split(/\s+/).slice(0, 25).join(' ') // First 25 words
        const excerpt = words.length < value.length ? words + '...' : words
        setFormData(prev => ({ ...prev, excerpt }))
      }
    }
  }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault()
      const newTag = e.currentTarget.value.trim()
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }))
      }
      e.currentTarget.value = ''
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const uploadImage = async (file: File, type: 'featured' | 'content') => {
    setIsUploading(true)
    setUploadError('')

    try {
      console.log('Starting upload for:', type, file.name, file.size, file.type)
      
      const formData = new FormData()
      formData.append('file', file)

      console.log('FormData created, sending request to /api/upload')
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      console.log('Response received:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error text:', errorText)
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Upload result:', result)

      if (type === 'featured') {
        setFormData(prev => ({ ...prev, featuredImage: result.url }))
      } else {
        setFormData(prev => ({ ...prev, contentImages: [...prev.contentImages, result.url] }))
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setUploadError(`Failed to upload image: ${errorMessage}`)
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadImage(file, 'featured')
    }
  }

  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadImage(file, 'content')
    }
  }

  const removeContentImage = (imageUrl: string) => {
    setFormData(prev => ({ 
      ...prev, 
      contentImages: prev.contentImages.filter(img => img !== imageUrl) 
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Featured Image Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Featured Image</label>
            <div className="space-y-3">
              {formData.featuredImage && (
                <div className="relative">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Upload Featured Image'}
                </button>
                {!formData.featuredImage && (
                  <span className="text-sm text-gray-500">Required for blog posts</span>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Enter post title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read Time *</label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => handleInputChange('readTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-gray-50"
                placeholder="Auto-calculated based on content"
                required
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Automatically calculated from your content</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Author name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="space-y-3">
                <input
                  type="text"
                  onKeyDown={handleTagInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Type custom tags or press Enter to add"
                />
                <div>
                  <p className="text-xs text-gray-500 mb-2">Quick add common tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (!formData.tags.includes(tag)) {
                            setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
                          }
                        }}
                        disabled={formData.tags.includes(tag)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          formData.tags.includes(tag)
                            ? 'bg-blue-100 text-blue-800 border-blue-200 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags Display */}
          {formData.tags.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Tags</label>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Excerpt */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Excerpt *</label>
              <button
                type="button"
                onClick={() => {
                  if (formData.content) {
                    const words = formData.content.split(/\s+/).slice(0, 25).join(' ')
                    const excerpt = words.length < formData.content.length ? words + '...' : words
                    setFormData(prev => ({ ...prev, excerpt }))
                  }
                }}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                Regenerate
              </button>
            </div>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Auto-generated from content (you can edit)"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Auto-generated from your content - edit as needed</p>
          </div>

          {/* Content Images Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Content Images</label>
            <div className="space-y-3">
              {formData.contentImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {formData.contentImages.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt={`Content ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeContentImage(imageUrl)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <input
                  ref={contentImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleContentImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => contentImageInputRef.current?.click()}
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  <ImageIcon className="h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Add Content Image'}
                </button>
                <span className="text-sm text-gray-500">Optional - for post content</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Write your blog post content here. You can use HTML tags for formatting."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              You can use HTML tags for formatting (e.g., &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;)
            </p>
          </div>

          {/* Error Display */}
          {uploadError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{uploadError}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.featuredImage || isUploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
