import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscCode } from 'react-icons/vsc'

export const technologyType = defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  icon: VscCode,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().error('"Name" is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'object',
      description:
        'Icon imported from `react-icons`. See: https://react-icons.github.io/react-icons',
      fields: [
        defineField({
          name: 'importPath',
          title: 'Import Path',
          type: 'string',
          options: {
            search: {
              weight: 1,
            },
            list: [
              { value: 'fa', title: 'fa' },
              { value: 'ci', title: 'ci' },
              { value: 'fa6', title: 'fa6' },
              { value: 'io', title: 'io' },
              { value: 'io5', title: 'io5' },
              { value: 'md', title: 'md' },
              { value: 'ti', title: 'ti' },
              { value: 'go', title: 'go' },
              { value: 'fi', title: 'fi' },
              { value: 'lu', title: 'lu' },
              { value: 'gi', title: 'gi' },
              { value: 'wi', title: 'wi' },
              { value: 'di', title: 'di' },
              { value: 'ai', title: 'ai' },
              { value: 'bs', title: 'bs' },
              { value: 'ri', title: 'ri' },
              { value: 'fc', title: 'fc' },
              { value: 'gr', title: 'gr' },
              { value: 'hi', title: 'hi' },
              { value: 'hi2', title: 'hi2' },
              { value: 'si', title: 'si' },
              { value: 'sl', title: 'sl' },
              { value: 'im', title: 'im' },
              { value: 'bi', title: 'bi' },
              { value: 'cg', title: 'cg' },
              { value: 'vsc', title: 'vsc' },
              { value: 'tb', title: 'tb' },
              { value: 'tfi', title: 'tfi' },
              { value: 'rx', title: 'rx' },
              { value: 'pi', title: 'pi' },
              { value: 'lia', title: 'lia' },
            ],
          },
          description:
            'The package to import the icon from. I.e.: `react-icons/[importPath]`',
          validation: (rule) =>
            rule.required().error('Import path is required'),
        }),
        defineField({
          name: 'componentName',
          title: 'Component Name',
          description: 'The name of the icon component',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'icon',
    },
  },
})
