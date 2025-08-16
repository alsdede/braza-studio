import {defineField, defineType} from 'sanity'

export const roundedListSection = defineType({
  name: 'roundedListSection',
  title: 'Rounded List Section',
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
      name: 'listItems',
      title: 'Items',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'iconType',
              title: 'Icon Type',
              type: 'string',
              description: 'Choose between image or Lucide icon',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Lucide Icon', value: 'lucide' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Item image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Alternative text for accessibility',
                },
              ],
              hidden: ({ parent }) => parent?.iconType !== 'image',
              validation: (Rule) =>
                Rule.custom((image, context) => {
                  const parent = context.parent as any;
                  if (parent?.iconType === 'image' && !image) {
                    return 'Image is required when icon type is "image"';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'lucideIcon',
              title: 'Lucide Icon',
              type: 'string',
              description: 'Name of the Lucide React icon (e.g., "Heart", "Star", "MapPin")',
              hidden: ({ parent }) => parent?.iconType !== 'lucide',
              validation: (Rule) =>
                Rule.custom((icon, context) => {
                  const parent = context.parent as any;
                  if (parent?.iconType === 'lucide' && !icon) {
                    return 'Lucide icon name is required when icon type is "lucide"';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'iconColor',
              title: 'Icon Color',
              type: 'string',
              description: 'Color for the Lucide icon (hex, rgb, or color name)',
              hidden: ({ parent }) => parent?.iconType !== 'lucide',
              initialValue: '#000000',
            }),
            defineField({
              name: 'iconSize',
              title: 'Icon Size',
              type: 'number',
              description: 'Size of the Lucide icon in pixels',
              hidden: ({ parent }) => parent?.iconType !== 'lucide',
              initialValue: 24,
              validation: (Rule) => Rule.min(12).max(100),
            }),
            defineField({
              name: 'title',
              title: 'Item Title',
              type: 'string',
              description: 'Image title',
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
                    params: {language: pageLanguage},
                  }
                },
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              iconType: 'iconType',
              image: 'image',
              lucideIcon: 'lucideIcon',
              iconColor: 'iconColor',
            },
            prepare(selection) {
              const { title, iconType, image, lucideIcon, iconColor } = selection;
              return {
                title: title || 'Untitled Item',
                subtitle: iconType === 'lucide' 
                  ? `Lucide: ${lucideIcon || 'No icon'} (${iconColor || '#000000'})` 
                  : 'Image',
                media: iconType === 'image' && image ? image : () => iconType === 'lucide' ? '🎯' : '🖼️',
              };
            },
          },
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
      listItems: 'listItems',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, listItems, isActive} = selection
      const itemCount = listItems ? listItems.length : 0
      return {
        title: `Rounded List: ${title || 'Untitled'}`,
        subtitle: `${subtitle || 'No title'} (${itemCount} items) ${isActive ? '(Active)' : '(Inactive)'}`,
        media: listItems && listItems[0] ? listItems[0].image || (() => '🎯') : () => '�',
      }
    },
  },
})
