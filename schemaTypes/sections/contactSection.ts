import {defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  icon: () => '📞',
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
      description: 'Section title',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Optional subtitle for the contact section',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Additional information about contacting',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
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
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'email',
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
          description: 'WhatsApp number with country code',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'website',
          title: 'Website',
          type: 'url',
        }),
      ],
    }),

    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        }),
      ],
    }),

    defineField({
      name: 'showContactForm',
      title: 'Show Contact Form',
      type: 'boolean',
      description: 'Display a contact form in this section',
      initialValue: false,
    }),

    defineField({
      name: 'contactForm',
      title: 'Contact Form Settings',
      type: 'object',
      hidden: ({parent}) => !parent?.showContactForm,
      fields: [
        defineField({
          name: 'formTitle',
          title: 'Form Title',
          type: 'string',
          description: 'Title for the contact form',
        }),
        defineField({
          name: 'formDescription',
          title: 'Form Description',
          type: 'text',
          description: 'Description text for the form',
          rows: 2,
        }),
        defineField({
          name: 'fields',
          title: 'Form Fields',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'fieldType',
                  title: 'Field Type',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Text Input', value: 'text'},
                      {title: 'Email Input', value: 'email'},
                      {title: 'Phone Input', value: 'phone'},
                      {title: 'Textarea', value: 'textarea'},
                      {title: 'Select Dropdown', value: 'select'},
                    ],
                  },
                }),
                defineField({
                  name: 'label',
                  title: 'Field Label',
                  type: 'string',
                  description: 'Label for this field',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'placeholder',
                  title: 'Placeholder Text',
                  type: 'string',
                  description: 'Placeholder text for this field',
                }),
                defineField({
                  name: 'isRequired',
                  title: 'Required Field',
                  type: 'boolean',
                  initialValue: false,
                }),
                defineField({
                  name: 'options',
                  title: 'Options (for select fields)',
                  type: 'array',
                  of: [{type: 'string'}],
                  hidden: ({parent}) => parent?.fieldType !== 'select',
                }),
              ],
              preview: {
                select: {
                  label: 'label',
                  fieldType: 'fieldType',
                  isRequired: 'isRequired',
                },
                prepare({label, fieldType, isRequired}) {
                  return {
                    title: label || 'Untitled Field',
                    subtitle: `${fieldType || 'text'}${isRequired ? ' (Required)' : ''}`,
                  }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'object',
          fields: [
            defineField({
              name: 'pt',
              title: 'Portuguese',
              type: 'string',
              initialValue: 'Enviar',
            }),
            defineField({
              name: 'en',
              title: 'English',
              type: 'string',
              initialValue: 'Send',
            }),
            defineField({
              name: 'es',
              title: 'Spanish',
              type: 'string',
              initialValue: 'Enviar',
            }),
          ],
        }),
        defineField({
          name: 'emailRecipient',
          title: 'Email Recipient',
          type: 'email',
          description: 'Email address to receive form submissions',
        }),
      ],
    }),

    defineField({
      name: 'showMap',
      title: 'Show Map',
      type: 'boolean',
      description: 'Display a map in this section',
      initialValue: false,
    }),

    defineField({
      name: 'mapSettings',
      title: 'Map Settings',
      type: 'object',
      hidden: ({parent}) => !parent?.showMap,
      fields: [
        defineField({
          name: 'coordinates',
          title: 'Map Center Coordinates',
          type: 'geopoint',
          description: 'Center point for the map',
        }),
        defineField({
          name: 'zoom',
          title: 'Zoom Level',
          type: 'number',
          description: 'Map zoom level (1-20)',
          validation: (Rule) => Rule.min(1).max(20),
          initialValue: 15,
        }),
        defineField({
          name: 'markers',
          title: 'Map Markers',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'coordinates',
                  title: 'Marker Coordinates',
                  type: 'geopoint',
                }),
                defineField({
                  name: 'title',
                  title: 'Marker Title',
                  type: 'string',
                  description: 'Title for this marker',
                }),
                defineField({
                  name: 'description',
                  title: 'Marker Description',
                  type: 'text',
                  description: 'Description for this marker',
                  rows: 2,
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  lat: 'coordinates.lat',
                  lng: 'coordinates.lng',
                },
                prepare({title, lat, lng}) {
                  return {
                    title: title || 'Untitled Marker',
                    subtitle: lat && lng ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : 'No coordinates',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      phone: 'contactInfo.phone',
      email: 'contactInfo.email',
      showForm: 'showContactForm',
      showMap: 'showMap',
      isActive: 'isActive',
    },
    prepare({title, phone, email, showForm, showMap, isActive}) {
      const features = []
      if (phone) features.push('Phone')
      if (email) features.push('Email')
      if (showForm) features.push('Form')
      if (showMap) features.push('Map')
      
      return {
        title: title || 'Contact Section',
        subtitle: `${features.join(', ') || 'No contact info'}${!isActive ? ' (Inactive)' : ''}`,
        media: () => '📞',
      }
    },
  },
})
