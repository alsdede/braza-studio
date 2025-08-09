import {defineField} from 'sanity'

// Define the supported languages with pt-pt as default
export const supportedLanguages = [
  {id: 'pt', title: 'Português (Portugal)', isDefault: true},
  {id: 'en', title: 'English', isDefault: false},
  {id: 'es', title: 'Español', isDefault: false},
] as const

// Helper function to create localized string fields
export const localeString = (name: string, title: string, description?: string) => {
  return defineField({
    name,
    title,
    description,
    type: 'object',
    // Fieldsets let you organize the fields in a UI
    fieldsets: [
      {
        title: 'Translations',
        name: 'translations',
        options: {collapsible: true},
      },
    ],
    // Define the fields for each language
    fields: supportedLanguages.map((lang) =>
      defineField({
        name: lang.id,
        title: lang.title,
        type: 'string',
        fieldset: lang.isDefault ? undefined : 'translations',
      }),
    ),
  })
}

// Helper function to create localized text (for longer content)
export const localeText = (name: string, title: string, description?: string) => {
  return defineField({
    name,
    title,
    description,
    type: 'object',
    fieldsets: [
      {
        title: 'Translations',
        name: 'translations',
        options: {collapsible: true},
      },
    ],
    fields: supportedLanguages.map((lang) =>
      defineField({
        name: lang.id,
        title: lang.title,
        type: 'text',
        rows: 4,
        fieldset: lang.isDefault ? undefined : 'translations',
      }),
    ),
  })
}

// Helper function to create localized block content (rich text)
export const localeBlockContent = (name: string, title: string, description?: string) => {
  return defineField({
    name,
    title,
    description,
    type: 'object',
    fieldsets: [
      {
        title: 'Translations',
        name: 'translations',
        options: {collapsible: true},
      },
    ],
    fields: supportedLanguages.map((lang) =>
      defineField({
        name: lang.id,
        title: lang.title,
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              {title: 'Normal', value: 'normal'},
              {title: 'H1', value: 'h1'},
              {title: 'H2', value: 'h2'},
              {title: 'H3', value: 'h3'},
              {title: 'Quote', value: 'blockquote'},
            ],
            lists: [
              {title: 'Bullet', value: 'bullet'},
              {title: 'Number', value: 'number'},
            ],
            marks: {
              decorators: [
                {title: 'Strong', value: 'strong'},
                {title: 'Emphasis', value: 'em'},
              ],
            },
          },
        ],
        fieldset: lang.isDefault ? undefined : 'translations',
      }),
    ),
  })
}
