import {defineField, defineType} from 'sanity'

export const featuredEstablishmentsSection = defineType({
  name: 'featuredEstablishmentsSection',
  title: 'Featured Establishments Section',
  type: 'object',
  icon: () => '🏪',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Internal title for content management',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this section is visible',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Title for this establishments section',
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          {title: 'Manual Selection', value: 'manual'},
          {title: 'Automatic (Latest)', value: 'latest'},
          {title: 'Automatic (Featured)', value: 'featured'},
        ],
      },
      initialValue: 'manual',
    }),
    defineField({
      name: 'establishments',
      title: 'Select Establishments',
      type: 'array',
      of: [
        defineField({
          name: 'establishment',
          title: 'Establishment',
          type: 'reference',
          to: [{type: 'establishment'}],
        }),
      ],
      hidden: ({parent}) => parent?.displayMode !== 'manual',
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'maxItems',
      title: 'Maximum Items',
      type: 'number',
      description: 'Maximum number of establishments to show',
      hidden: ({parent}) => parent?.displayMode === 'manual',
      initialValue: 4,
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (2 columns)', value: 'grid2'},
          {title: 'Grid (3 columns)', value: 'grid3'},
          {title: 'Horizontal Slider', value: 'slider'},
          {title: 'List View', value: 'list'},
        ],
      },
      initialValue: 'grid2',
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'title',
      displayMode: 'displayMode',
      establishments: 'establishments',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, displayMode, establishments, isActive} = selection
      const count = establishments ? establishments.length : 0
      const mode = displayMode === 'manual' ? `${count} selected` : displayMode
      return {
        title: `Establishments: ${title || 'Untitled'}`,
        subtitle: `${subtitle || 'No title'} (${mode}) ${isActive ? '(Active)' : '(Inactive)'}`,
        media: () => '🏪',
      }
    },
  },
})
