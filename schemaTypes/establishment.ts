import {defineField, defineType} from 'sanity'

export const establishment = defineType({
  name: 'establishment',
  title: 'Establishments',
  type: 'document',
  icon: () => '🏪',
  fields: [
    // Basic Information
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the establishment',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description of the establishment',
      rows: 3,
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      description: 'Full description with rich text',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Category
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Restaurante', value: 'restaurant'},
          {title: 'Bar', value: 'bar'},
          {title: 'Café', value: 'cafe'},
          {title: 'Hotel', value: 'hotel'},
          {title: 'Loja', value: 'shop'},
          {title: 'Atração Turística', value: 'attraction'},
          {title: 'Serviços', value: 'services'},
          {title: 'Entretenimento', value: 'entertainment'},
          {title: 'Outro', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // Images
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image for the establishment',
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
      name: 'gallery',
      title: 'Gallery',
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
              description: 'Alternative text for accessibility',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image',
            }),
          ],
        },
      ],
    }),

    // Location Information
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
          description: 'Full street address',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'Portugal',
        }),
        defineField({
          name: 'coordinates',
          title: 'GPS Coordinates',
          type: 'geopoint',
          description: 'Exact location for map display',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Contact Information
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          description: 'Primary phone number',
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
          description: 'WhatsApp number (if different from phone)',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
        }),
        defineField({
          name: 'website',
          title: 'Website',
          type: 'url',
        }),
      ],
    }),

    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'Facebook page URL',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Instagram profile URL',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
          description: 'Twitter/X profile URL',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'LinkedIn page URL',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          description: 'YouTube channel URL',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
          description: 'TikTok profile URL',
        }),
      ],
    }),

    // Operating Hours
    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  {title: 'Segunda-feira', value: 'monday'},
                  {title: 'Terça-feira', value: 'tuesday'},
                  {title: 'Quarta-feira', value: 'wednesday'},
                  {title: 'Quinta-feira', value: 'thursday'},
                  {title: 'Sexta-feira', value: 'friday'},
                  {title: 'Sábado', value: 'saturday'},
                  {title: 'Domingo', value: 'sunday'},
                ],
              },
            }),
            defineField({
              name: 'openTime',
              title: 'Opening Time',
              type: 'string',
              description: 'Format: HH:MM (e.g., 09:00)',
            }),
            defineField({
              name: 'closeTime',
              title: 'Closing Time',
              type: 'string',
              description: 'Format: HH:MM (e.g., 18:00)',
            }),
            defineField({
              name: 'isClosed',
              title: 'Closed',
              type: 'boolean',
              description: 'Check if closed on this day',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              day: 'day',
              openTime: 'openTime',
              closeTime: 'closeTime',
              isClosed: 'isClosed',
            },
            prepare(selection) {
              const {day, openTime, closeTime, isClosed} = selection
              const dayNames = {
                monday: 'Segunda',
                tuesday: 'Terça',
                wednesday: 'Quarta',
                thursday: 'Quinta',
                friday: 'Sexta',
                saturday: 'Sábado',
                sunday: 'Domingo',
              }
              const displayDay = dayNames[day as keyof typeof dayNames] || day
              
              if (isClosed) {
                return {
                  title: `${displayDay}: Fechado`,
                }
              }
              
              return {
                title: `${displayDay}: ${openTime} - ${closeTime}`,
              }
            },
          },
        },
      ],
    }),

    // Features and Amenities
    defineField({
      name: 'features',
      title: 'Features & Amenities',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          {title: 'Wi-Fi Grátis', value: 'free-wifi'},
          {title: 'Estacionamento', value: 'parking'},
          {title: 'Acessível para Cadeirantes', value: 'wheelchair-accessible'},
          {title: 'Aceita Animais', value: 'pet-friendly'},
          {title: 'Ar Condicionado', value: 'air-conditioning'},
          {title: 'Terraço/Esplanada', value: 'terrace'},
          {title: 'Entrega ao Domicílio', value: 'delivery'},
          {title: 'Take Away', value: 'takeaway'},
          {title: 'Cartão de Crédito', value: 'credit-cards'},
          {title: 'Multibanco', value: 'atm'},
          {title: 'Reservas Online', value: 'online-booking'},
        ],
      },
    }),

    // Rating and Price Range
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          {title: '€ - Económico', value: 'budget'},
          {title: '€€ - Moderado', value: 'moderate'},
          {title: '€€€ - Caro', value: 'expensive'},
          {title: '€€€€ - Muito Caro', value: 'luxury'},
        ],
      },
    }),

    defineField({
      name: 'averageRating',
      title: 'Average Rating',
      type: 'number',
      description: 'Rating from 1 to 5',
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // Status
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this establishment is currently active/open',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this establishment in featured sections',
      initialValue: false,
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title for search engines',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description for search engines',
          rows: 2,
        }),
      ],
    }),

    // Timestamps
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'featuredImage',
      city: 'location.city',
      isActive: 'isActive',
      isFeatured: 'isFeatured',
    },
    prepare(selection) {
      const {title, subtitle, media, city, isActive, isFeatured} = selection
      
      const categoryNames = {
        restaurant: 'Restaurante',
        bar: 'Bar',
        cafe: 'Café',
        hotel: 'Hotel',
        shop: 'Loja',
        attraction: 'Atração',
        services: 'Serviços',
        entertainment: 'Entretenimento',
        other: 'Outro',
      }
      
      const displayCategory = categoryNames[subtitle as keyof typeof categoryNames] || subtitle
      const status = []
      
      if (isFeatured) status.push('⭐')
      if (!isActive) status.push('🚫')
      
      return {
        title: title || 'Unnamed establishment',
        subtitle: `${displayCategory}${city ? ` • ${city}` : ''} ${status.join(' ')}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Category',
      name: 'category',
      by: [{field: 'category', direction: 'asc'}],
    },
    {
      title: 'Featured First',
      name: 'featured',
      by: [
        {field: 'isFeatured', direction: 'desc'},
        {field: 'name', direction: 'asc'},
      ],
    },
    {
      title: 'Recently Created',
      name: 'newest',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
  ],
})
