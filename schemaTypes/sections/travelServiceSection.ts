import { defineType } from 'sanity';

export const travelServiceSection = defineType({
  name: 'travelServiceSection',
  title: 'Travel Essentials Section',
  type: 'object',
  icon: () => '✈️',

  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Title for the travel services section',
      initialValue: 'Travel Essentials',
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      description: 'Optional subtitle or description for the section',
      rows: 2,
    },
    {
      name: 'services',
      title: 'Travel Services',
      type: 'array',
      description: 'List of travel services (flights, accommodations, activities, etc.)',
      of: [
        {
          type: 'object',
          name: 'travelService',
          title: 'Travel Service',
          fields: [
            {
              name: 'name',
              title: 'Service Name',
              type: 'string',
              description: 'Name of the travel service (e.g., "Voos", "Estadias", "O que fazer")',
              validation: (Rule) => Rule.required().min(1).max(50),
            },
            {
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              description: 'URL-friendly identifier for the service',
              options: {
                source: 'name',
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              description: 'Background image for the service card',
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              description: 'Type of link for this service',
              options: {
                list: [
                  { title: 'External Link (WebView)', value: 'external' },
                  { title: 'Internal Page Reference', value: 'internal' },
                  { title: 'External Link (Browser)', value: 'browser' },
                ],
                layout: 'radio',
              },
              initialValue: 'external',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              description: 'External URL for the service (for external links)',
              hidden: ({ parent }) => parent?.linkType === 'internal',
              validation: (Rule) =>
                Rule.custom((url, context) => {
                  const parent = context.parent as any;
                  if (parent?.linkType !== 'internal' && !url) {
                    return 'External URL is required for external links';
                  }
                  return true;
                }),
            },
            {
              name: 'internalReference',
              title: 'Internal Page Reference',
              type: 'reference',
              description: 'Reference to an internal page or content',
              to: [
                { type: 'page' },
                { type: 'establishment' },
                { type: 'news' },
              ],
              hidden: ({ parent }) => parent?.linkType !== 'internal',
              validation: (Rule) =>
                Rule.custom((ref, context) => {
                  const parent = context.parent as any;
                  if (parent?.linkType === 'internal' && !ref) {
                    return 'Internal reference is required for internal links';
                  }
                  return true;
                }),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Short description of the service (optional)',
              rows: 2,
            },
            {
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              description: 'Whether this service is currently active',
              initialValue: true,
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this service should appear (lower numbers first)',
              initialValue: 1,
              validation: (Rule) => Rule.min(0),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'linkType',
              media: 'backgroundImage',
              order: 'order',
              isActive: 'isActive',
            },
            prepare(selection) {
              const { title, subtitle, media, order, isActive } = selection;
              return {
                title: `${order ? `${order}. ` : ''}${title}`,
                subtitle: `${subtitle} ${!isActive ? '(Inactive)' : ''}`,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(10),
    },
    {
      name: 'isVisible',
      title: 'Section Visible',
      type: 'boolean',
      description: 'Whether this section should be displayed on the homepage',
      initialValue: true,
    },
    {
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      description: 'How the services should be displayed',
      options: {
        list: [
          { title: 'Grid (3 columns)', value: 'grid-3' },
          { title: 'Grid (2 columns)', value: 'grid-2' },
          { title: 'Horizontal Scroll', value: 'horizontal' },
          { title: 'Vertical List', value: 'vertical' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid-3',
    },
  ],
  preview: {
    select: {
      title: 'title',
      servicesCount: 'services',
      isVisible: 'isVisible',
    },
    prepare(selection) {
      const { title, servicesCount, isVisible } = selection;
      const count = Array.isArray(servicesCount) ? servicesCount.length : 0;
      return {
        title: title || 'Travel Essentials Section',
        subtitle: `${count} service${count !== 1 ? 's' : ''} ${!isVisible ? '(Hidden)' : ''}`,
        media: () => '✈️',
      };
    },
  },
});

export default travelServiceSection;
