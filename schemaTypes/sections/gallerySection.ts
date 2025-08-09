import {defineField, defineType} from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Section title',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Optional subtitle for the gallery',
      rows: 2,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'linkTo',
              title: 'Link To Page',
              type: 'reference',
              description: 'Optional page to navigate to when image is clicked',
              to: [{type: 'page'}],
              options: {
                filter: ({document}) => {
                  // Get the parent page's language from the document context
                  const pageLanguage = document?.language || 'pt'
                  return {
                    filter: 'language == $language && isActive == true',
                    params: {language: pageLanguage}
                  }
                }
              }
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'layout',
      title: 'Gallery Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Carousel', value: 'carousel'},
          {title: 'Masonry', value: 'masonry'},
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      imageCount: 'images.length',
      layout: 'layout',
      isActive: 'isActive',
    },
    prepare({title, imageCount, layout, isActive}) {
      return {
        title: title || 'Gallery Section',
        subtitle: `${imageCount || 0} images • ${layout || 'grid'} layout${!isActive ? ' (Inactive)' : ''}`,
        media: () => '🖼️',
      }
    },
  },
})
