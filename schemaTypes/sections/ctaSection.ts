import {defineField, defineType} from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Call to Action Section',
  type: 'object',
  icon: () => '🎯',
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
      description: 'Main title for the CTA section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Subtitle or description text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
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
      name: 'buttons',
      title: 'Action Buttons',
      type: 'array',
      of: [
        defineField({
          name: 'button',
          title: 'Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              description: 'Text displayed on the button',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Outline', value: 'outline'},
                ],
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'type',
                  title: 'Link Type',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Internal Page', value: 'internal'},
                      {title: 'External URL', value: 'external'},
                      {title: 'Phone Number', value: 'phone'},
                      {title: 'Email', value: 'email'},
                    ],
                  },
                  initialValue: 'internal',
                }),
                defineField({
                  name: 'internalLink',
                  title: 'Internal Page',
                  type: 'reference',
                  to: [{type: 'page'}],
                  hidden: ({parent}) => parent?.type !== 'internal',
                }),
                defineField({
                  name: 'externalUrl',
                  title: 'External URL',
                  type: 'url',
                  hidden: ({parent}) => parent?.type !== 'external',
                }),
                defineField({
                  name: 'phone',
                  title: 'Phone Number',
                  type: 'string',
                  hidden: ({parent}) => parent?.type !== 'phone',
                }),
                defineField({
                  name: 'email',
                  title: 'Email',
                  type: 'email',
                  hidden: ({parent}) => parent?.type !== 'email',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'style',
            },
            prepare(selection) {
              const {title, subtitle} = selection
              return {
                title: title || 'Button',
                subtitle: subtitle || 'primary',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(3),
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'title',
      media: 'backgroundImage',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, media, isActive} = selection
      return {
        title: `CTA: ${title || 'Untitled'}`,
        subtitle: `${subtitle || 'No title'} ${isActive ? '(Active)' : '(Inactive)'}`,
        media,
      }
    },
  },
})
