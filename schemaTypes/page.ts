import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title for content management',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Language/locale for this page',
      options: {
        list: [
          {title: 'Português', value: 'pt'},
          {title: 'English', value: 'en'},
          {title: 'Español', value: 'es'},
        ],
      },
      initialValue: 'pt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL identifier for the page',
      options: {
        source: 'title',
        maxLength: 100,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageTitle',
      title: 'Display Title',
      type: 'string',
      description: 'Title displayed to users',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Page description for SEO and preview',
      rows: 3,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this page is published and visible',
      initialValue: false,
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Dynamic sections that make up this page',
      of: [
        {type: 'heroSection'},
        {type: 'contentSection'},
        {type: 'gallerySection'},
        {type: 'ctaSection'},
        {type: 'featuredEstablishmentsSection'},
        {type: 'latestNewsSection'},
        {type: 'contactSection'},
               {type: 'travelServiceSection'},
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Search engine optimization settings',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for search engines',
          rows: 2,
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Media Image',
          type: 'image',
          description: 'Image for social media sharing',
          options: {
            hotspot: true,
          },
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
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
      subtitle: 'pageTitle',
      language: 'language',
      media: 'seo.ogImage',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, language, media, isActive} = selection
      const languageLabel = language === 'pt' ? '🇵🇹' : language === 'en' ? '🇬🇧' : language === 'es' ? '🇪🇸' : ''
      return {
        title: `${languageLabel} ${title || 'Untitled Page'}`,
        subtitle: `${subtitle || 'No display title'} ${isActive ? '(Published)' : '(Draft)'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
