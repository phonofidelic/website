import { defineArrayMember, defineField, defineType } from 'sanity'
import { CiBoxList } from 'react-icons/ci'
import { IdField } from '../components/IdField'

export const projectsListType = defineType({
  name: 'projectsList',
  title: 'Projects List',

  type: 'document',
  icon: CiBoxList,
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      components: {
        field: IdField,
      },
      readOnly: true,
    }),
    defineField({
      name: 'listTitle',
      title: 'List Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'listMembers',
      title: 'List Members',
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
      title: 'listTitle',
      media: 'icon',
    },
  },
})
