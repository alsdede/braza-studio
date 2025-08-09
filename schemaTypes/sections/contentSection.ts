import {defineField, defineType} from 'sanity'

export const contentSection = defineType({
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  icon: () => '📝',
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
      title: 'Title',
      type: 'string',
      description: 'Section title displayed to users',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Rich text content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Left Aligned', value: 'left'},
          {title: 'Center Aligned', value: 'center'},
          {title: 'Two Columns', value: 'twoColumns'},
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Light Gray', value: 'lightGray'},
          {title: 'Brand Primary', value: 'primary'},
          {title: 'Brand Secondary', value: 'secondary'},
        ],
      },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'title',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, isActive} = selection
      return {
        title: `Content: ${title || 'Untitled'}`,
        subtitle: `${subtitle || 'No title'} ${isActive ? '(Active)' : '(Inactive)'}`,
        media: () => '📝',
      }
    },
  },
})
