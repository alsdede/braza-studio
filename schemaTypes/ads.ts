import {defineField, defineType} from 'sanity'

export const ads = defineType({
  name: 'ads',
  title: 'Advertisement Campaigns',
  type: 'document',
  icon: () => '📢',
  fields: [
    // Campaign Basic Information
    defineField({
      name: 'title',
      title: 'Campaign Title',
      type: 'string',
      description: 'Title of the advertisement campaign',
    }),
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      description: 'Internal name for campaign management (not shown to users)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the advertisement',
    }),

    // Campaign Type and Placement
    defineField({
      name: 'campaignType',
      title: 'Campaign Type',
      type: 'string',
      options: {
        list: [
          {title: 'Banner - Home Top', value: 'banner_home_top'},
          {title: 'Banner - Home Bottom', value: 'banner_home_bottom'},
          {title: 'Banner - Establishments List', value: 'banner_establishments'},
          {title: 'Banner - News Feed', value: 'banner_news'},
          {title: 'Fullscreen Interstitial', value: 'interstitial'},
          {title: 'Native Content', value: 'native'},
          {title: 'Popup Modal', value: 'popup'},
          {title: 'Sponsored Content', value: 'sponsored'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers = higher priority (1-100)',
      validation: (Rule) => Rule.min(1).max(100),
      initialValue: 50,
    }),

    // Media Content
    defineField({
      name: 'media',
      title: 'Campaign Media',
      type: 'object',
      fields: [
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
                  name: 'dimensions',
                  title: 'Intended Dimensions',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Square (1:1)', value: 'square'},
                      {title: 'Landscape (16:9)', value: 'landscape'},
                      {title: 'Portrait (9:16)', value: 'portrait'},
                      {title: 'Banner (3:1)', value: 'banner'},
                      {title: 'Full Screen', value: 'fullscreen'},
                    ],
                  },
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.min(1).required(),
        }),
        defineField({
          name: 'video',
          title: 'Video (Optional)',
          type: 'file',
          options: {
            accept: 'video/*',
          },
        }),
      ],
    }),

    // Campaign Dates and Schedule
    defineField({
      name: 'schedule',
      title: 'Campaign Schedule',
      type: 'object',
      fields: [
        defineField({
          name: 'startDate',
          title: 'Start Date',
          type: 'datetime',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'endDate',
          title: 'End Date',
          type: 'datetime',
          validation: (Rule) => Rule.required().min(Rule.valueOfField('startDate')),
        }),
        defineField({
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          initialValue: 'Europe/Lisbon',
          options: {
            list: [
              {title: 'Lisbon (UTC+0/+1)', value: 'Europe/Lisbon'},
              {title: 'London (UTC+0/+1)', value: 'Europe/London'},
              {title: 'New York (UTC-5/-4)', value: 'America/New_York'},
              {title: 'São Paulo (UTC-3)', value: 'America/Sao_Paulo'},
            ],
          },
        }),
        defineField({
          name: 'isAlwaysActive',
          title: 'Always Active',
          type: 'boolean',
          description: 'Ignore start/end dates and always show this campaign',
          initialValue: false,
        }),
      ],
    }),

    // Target and Navigation
    defineField({
      name: 'action',
      title: 'Campaign Action',
      type: 'object',
      fields: [
        defineField({
          name: 'actionType',
          title: 'Action Type',
          type: 'string',
          options: {
            list: [
              {title: 'Open URL', value: 'url'},
              {title: 'Navigate to Page', value: 'page'},
              {title: 'Navigate to Establishment', value: 'establishment'},
              {title: 'Navigate to News Article', value: 'news'},
              {title: 'Open Phone Dialer', value: 'phone'},
              {title: 'Open Email', value: 'email'},
              {title: 'No Action', value: 'none'},
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          hidden: ({parent}) => parent?.actionType !== 'url',
        }),
        defineField({
          name: 'pageReference',
          title: 'Page Reference',
          type: 'reference',
          to: [{type: 'page'}],
          hidden: ({parent}) => parent?.actionType !== 'page',
        }),
        defineField({
          name: 'establishmentReference',
          title: 'Establishment Reference',
          type: 'reference',
          to: [{type: 'establishment'}],
          hidden: ({parent}) => parent?.actionType !== 'establishment',
        }),
        defineField({
          name: 'newsReference',
          title: 'News Reference',
          type: 'reference',
          to: [{type: 'news'}],
          hidden: ({parent}) => parent?.actionType !== 'news',
        }),
        defineField({
          name: 'phoneNumber',
          title: 'Phone Number',
          type: 'string',
          hidden: ({parent}) => parent?.actionType !== 'phone',
        }),
        defineField({
          name: 'emailAddress',
          title: 'Email Address',
          type: 'email',
          hidden: ({parent}) => parent?.actionType !== 'email',
        }),
      ],
    }),

    // Targeting Options
    defineField({
      name: 'targeting',
      title: 'Targeting Options',
      type: 'object',
      fields: [
        defineField({
          name: 'languages',
          title: 'Target Languages',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            list: [
              {title: 'Portuguese (PT)', value: 'pt'},
              {title: 'English', value: 'en'},
              {title: 'Spanish', value: 'es'},
            ],
          },
          description: 'Leave empty to show to all languages',
        }),
        defineField({
          name: 'userTypes',
          title: 'Target User Types',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            list: [
              {title: 'New Users', value: 'new'},
              {title: 'Returning Users', value: 'returning'},
              {title: 'Premium Users', value: 'premium'},
            ],
          },
          description: 'Leave empty to show to all user types',
        }),
        defineField({
          name: 'maxViewsPerUser',
          title: 'Max Views Per User',
          type: 'number',
          description: 'Maximum times a user should see this ad (0 = unlimited)',
          initialValue: 0,
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    // Campaign Status and Analytics
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this campaign is currently active',
      initialValue: true,
    }),
    defineField({
      name: 'budget',
      title: 'Budget Information',
      type: 'object',
      fields: [
        defineField({
          name: 'totalBudget',
          title: 'Total Budget (€)',
          type: 'number',
        }),
        defineField({
          name: 'costPerClick',
          title: 'Cost Per Click (€)',
          type: 'number',
        }),
        defineField({
          name: 'costPerView',
          title: 'Cost Per View (€)',
          type: 'number',
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    // Client Information
    defineField({
      name: 'client',
      title: 'Client Information',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Client Name',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Client Email',
          type: 'email',
        }),
        defineField({
          name: 'company',
          title: 'Company',
          type: 'string',
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    // Analytics (read-only, populated by app)
    defineField({
      name: 'analytics',
      title: 'Campaign Analytics',
      type: 'object',
      readOnly: true,
      fields: [
        defineField({
          name: 'impressions',
          title: 'Impressions',
          type: 'number',
          initialValue: 0,
        }),
        defineField({
          name: 'clicks',
          title: 'Clicks',
          type: 'number',
          initialValue: 0,
        }),
        defineField({
          name: 'clickThroughRate',
          title: 'Click-Through Rate (%)',
          type: 'number',
          initialValue: 0,
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    // Timestamps
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      internalName: 'internalName',
      campaignType: 'campaignType',
      startDate: 'schedule.startDate',
      endDate: 'schedule.endDate',
      isActive: 'isActive',
      media: 'media.images.0',
    },
    prepare({title, internalName, campaignType, startDate, endDate, isActive, media}) {
      const now = new Date()
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null
      
      let status = ''
      if (!isActive) {
        status = '⏸️ Paused'
      } else if (start && start > now) {
        status = '⏳ Scheduled'
      } else if (end && end < now) {
        status = '✅ Ended'
      } else {
        status = '🔴 Live'
      }
      
      const typeFormatted = campaignType?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Unknown Type'
      
      return {
        title: title || internalName || 'Untitled Campaign',
        subtitle: `${typeFormatted} • ${status}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{field: 'schedule.startDate', direction: 'desc'}],
    },
    {
      title: 'Priority, High',
      name: 'priorityDesc',
      by: [{field: 'priority', direction: 'desc'}],
    },
    {
      title: 'Campaign Type',
      name: 'typeAsc',
      by: [{field: 'campaignType', direction: 'asc'}],
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        {field: 'isActive', direction: 'desc'},
        {field: 'schedule.startDate', direction: 'desc'},
      ],
    },
  ],
})
