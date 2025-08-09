import {defineField, defineType} from 'sanity'

export const homeContent = defineType({
  name: 'homeContent',
  title: 'Home Content',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for content management',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'welcomeTitle',
      title: 'Welcome Title',
      type: 'string',
      description: 'Main welcome message on home screen',
    }),
    defineField({
      name: 'welcomeSubtitle',
      title: 'Welcome Subtitle',
      type: 'text',
      description: 'Subtitle text below the welcome title',
    }),
    defineField({
      name: 'featuredContent',
      title: 'Featured Content',
      type: 'array',
      description: 'Rich text content for featured section',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one home content should be active at a time',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'welcomeTitle',
      media: 'featuredImage',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, media, isActive} = selection
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle || 'No subtitle'} ${isActive ? '(Active)' : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
