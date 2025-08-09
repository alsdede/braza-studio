import {defineField, defineType} from 'sanity'

export const latestNewsSection = defineType({
  name: 'latestNewsSection',
  title: 'Latest News Section',
  type: 'object',
  icon: () => '📰',
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
      description: 'Title for this news section',
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
          {title: 'By Category', value: 'category'},
        ],
      },
      initialValue: 'latest',
    }),
    defineField({
      name: 'news',
      title: 'Select News',
      type: 'array',
      of: [
        defineField({
          name: 'newsItem',
          title: 'News Item',
          type: 'reference',
          to: [{type: 'news'}],
        }),
      ],
      hidden: ({parent}) => parent?.displayMode !== 'manual',
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'category',
      title: 'News Category',
      type: 'string',
      options: {
        list: [
          {title: 'Notícias Gerais', value: 'general'},
          {title: 'Eventos', value: 'events'},
          {title: 'Turismo', value: 'tourism'},
          {title: 'Cultura', value: 'culture'},
          {title: 'Gastronomia', value: 'gastronomy'},
          {title: 'Negócios', value: 'business'},
          {title: 'Desporto', value: 'sports'},
          {title: 'Comunidade', value: 'community'},
          {title: 'Anúncios', value: 'announcements'},
        ],
      },
      hidden: ({parent}) => parent?.displayMode !== 'category',
    }),
    defineField({
      name: 'maxItems',
      title: 'Maximum Items',
      type: 'number',
      description: 'Maximum number of news items to show',
      hidden: ({parent}) => parent?.displayMode === 'manual',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Cards (2 columns)', value: 'cards2'},
          {title: 'Cards (3 columns)', value: 'cards3'},
          {title: 'Horizontal Slider', value: 'slider'},
          {title: 'List View', value: 'list'},
          {title: 'Featured + List', value: 'featuredList'},
        ],
      },
      initialValue: 'cards2',
    }),
    defineField({
      name: 'showReadMoreButton',
      title: 'Show "Read More" Button',
      type: 'boolean',
      description: 'Show a button to view all news',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'title',
      displayMode: 'displayMode',
      news: 'news',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, displayMode, news, isActive} = selection
      const count = news ? news.length : 0
      const mode = displayMode === 'manual' ? `${count} selected` : displayMode
      return {
        title: `News: ${title || 'Untitled'}`,
        subtitle: `${subtitle || 'No title'} (${mode}) ${isActive ? '(Active)' : '(Inactive)'}`,
        media: () => '📰',
      }
    },
  },
})
