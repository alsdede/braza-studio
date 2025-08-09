import {defineField, defineType} from 'sanity'

export const imageGallerySection = defineType({
  name: 'imageGallerySection',
  title: 'Image Gallery Section',
  type: 'object',
  icon: () => '🖼️',
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
      title: 'Gallery Title',
      type: 'string',
      description: 'Title for this gallery section',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineField({
          name: 'galleryImage',
          title: 'Gallery Image',
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
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Image caption',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: 'layout',
      title: 'Gallery Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (2 columns)', value: 'grid2'},
          {title: 'Grid (3 columns)', value: 'grid3'},
          {title: 'Masonry', value: 'masonry'},
          {title: 'Slider', value: 'slider'},
        ],
      },
      initialValue: 'grid3',
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'title',
      images: 'images',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, images, isActive} = selection
      const imageCount = images ? images.length : 0
      return {
        title: `Gallery: ${title || 'Untitled'}`,
        subtitle: `${subtitle || 'No title'} (${imageCount} images) ${isActive ? '(Active)' : '(Inactive)'}`,
        media: images && images[0] ? images[0] : () => '🖼️',
      }
    },
  },
})
