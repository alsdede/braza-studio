import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  icon: () => '📰',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the news article',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary/preview of the article',
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Notícias Gerais', value: 'general'},
          {title: 'Eventos', value: 'events'},
          {title: 'Cultura', value: 'culture'},
          {title: 'Gastronomia', value: 'gastronomy'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When this article was/will be published',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Rascunho', value: 'draft'},
          {title: 'Publicado', value: 'published'},
        ],
      },
      initialValue: 'draft',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {title, subtitle, publishedAt} = selection
      const publishedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('pt-PT') : ''
      
      return {
        title: title || 'Untitled article',
        subtitle: `${subtitle || 'No category'}${publishedDate ? ` • ${publishedDate}` : ''}`,
      }
    },
  },
})
