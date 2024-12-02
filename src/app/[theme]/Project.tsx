import Image from 'next/image'
import dayjs from 'dayjs'
import { PortableText } from 'next-sanity'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlFor } from '@/sanity/lib/image'
import { FEATURED_PROJECTS_QUERYResult, PAGE_QUERYResult } from '@/sanity/types'
import { VscCode } from 'react-icons/vsc'
import { TechnologyList } from './TechnologyList'
import React from 'react'

export function ProjectPreview({
  project,
}: {
  project: NonNullable<
    NonNullable<NonNullable<PAGE_QUERYResult>['list']>['listMembers']
  >[number] & {
    title: string
    categories: { slug: string | null }[] | null
  }
}) {
  if (
    project.categories &&
    (project.categories
      .map((category) => category.slug)
      .includes('work-experience') ||
      project.categories.map((category) => category.slug).includes('education'))
  ) {
    const duration = dayjs(project.endDate).diff(
      dayjs(project.startDate),
      'month',
    )

    return (
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="flex flex-col gap-1">
          {project.endDate && (
            <div>{dayjs(project.endDate).format('MMMM YYYY')}</div>
          )}
          <div
            className="flex border-l-2 border-zinc-800 dark:border-white grow ml-4"
            style={{
              height: `${duration / 3}rem`,
            }}
          ></div>
          {project.startDate && (
            <div>{dayjs(project.startDate).format('MMMM YYYY')}</div>
          )}
        </div>
        <div className="flex flex-col gap-4 col-span-2 justify-end">
          <h3 className="text-xl">{project.title}</h3>
          {project.description && (
            <div className="text-sm">{project.description}</div>
          )}
          {Array.isArray(project.body) && (
            <div className="prose">
              <PortableText
                value={project.body}
                components={{
                  marks: {
                    link: ({ children, value }) => (
                      <a
                        className="hover:underline"
                        href={value.href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </div>
          )}
          {project.links && project.links.length > 0 && (
            <div className="flex gap-x-2 divide-x divide-zinc-800 dark:divide-white text-sm">
              {project.links
                .filter((link) => assertValidProjectLink(link))
                .map((link) => (
                  <ProjectLink
                    key={link._key}
                    title={link.title}
                    href={link.url}
                  />
                ))}
            </div>
          )}
          {project.technologies && project.technologies.length > 0 && (
            <TechnologyList>
              {project.technologies
                .filter((technology) => assertValidTechnology(technology))
                .map(({ _id, name, icon, link }) => (
                  <Pill
                    key={_id}
                    title={name}
                    icon={<TechnologyIcon icon={icon} />}
                    link={link}
                  />
                ))}
            </TechnologyList>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 group">
      <h3 className="text-xl">{project.title}</h3>
      {(project.startDate ?? project.endDate) && (
        <div className="flex gap-2">
          {project.startDate && (
            <div>{new Date(project.startDate).toLocaleDateString('sv-se')}</div>
          )}
          {project.endDate && (
            <div>
              to {new Date(project.endDate).toLocaleDateString('sv-se')}
            </div>
          )}
        </div>
      )}
      {project.mainImage && project.mainImage.asset && (
        <div className="p-2 dark:opacity-75 group-hover:dark:opacity-90 transition-opacity">
          <ProjectImage
            image={project.mainImage}
            projectTitle={project.title}
          />
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex gap-1 w-full overflow-x-auto">
            {project.technologies
              .filter((technology) => assertValidTechnology(technology))
              .map(({ _id, name, icon, link }) => (
                <Pill
                  key={_id}
                  title={name}
                  icon={<TechnologyIcon icon={icon} />}
                  link={link}
                />
              ))}
          </div>
        )}
        {project.links && project.links.length > 0 && (
          <div className="flex gap-x-2 divide-x divide-zinc-800 dark:divide-white text-sm">
            {project.links
              .filter((link) => assertValidProjectLink(link))
              .map((link) => (
                <ProjectLink
                  key={link._key}
                  title={link.title}
                  href={link.url}
                />
              ))}
          </div>
        )}
      </div>
      {Array.isArray(project.body) && (
        <div className="prose">
          <PortableText
            value={project.body}
            components={{
              marks: {
                link: ({ children, value }) => (
                  <a
                    className="hover:underline"
                    href={value.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>
      )}
    </div>
  )
}

export const assertValidProject = (
  project: NonNullable<
    NonNullable<NonNullable<PAGE_QUERYResult>['list']>['listMembers']
  >[number],
): project is NonNullable<
  NonNullable<
    NonNullable<NonNullable<PAGE_QUERYResult>['list']>['listMembers']
  >[number] & {
    title: string
    categories: { slug: string | null }[] | null
  }
> => {
  return Boolean(project && project.title)
}

const assertValidTechnology = (technology: {
  name?: string | undefined
  link?: string | undefined
  icon?:
    | { importPath?: string | undefined; componentName?: string | undefined }
    | undefined
}): technology is {
  name: string
  link: string
  icon: { importPath: string; componentName: string }
} => {
  return Boolean(
    technology &&
      technology.name &&
      technology.link &&
      ((technology.icon &&
        technology.icon.importPath &&
        technology.icon.componentName) ||
        technology.icon === undefined),
  )
}

const assertValidProjectLink = (link: {
  url?: string | undefined
  title?: string | undefined
}): link is { url: string; title: string } => {
  return Boolean(link && link.url && link.title)
}

function ProjectImage({
  image,
  projectTitle,
}: {
  image: NonNullable<
    NonNullable<
      NonNullable<FEATURED_PROJECTS_QUERYResult>['listMembers']
    >[number]['mainImage']
  >
  projectTitle: string
}) {
  if (!image || !image.asset) {
    console.error('Invalid image data:', image)
    return null
  }

  const alt = image.alt ?? `A screenshot of the ${projectTitle} project`

  return (
    <Image
      src={urlFor(image).url()}
      alt={alt}
      width={getImageDimensions(image.asset).width}
      height={getImageDimensions(image.asset).height}
      placeholder="blur"
      blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
      sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
    />
  )
}

function ProjectLink({ title, href }: { title: string; href: string }) {
  return (
    <a
      className="hover:underline pl-2 leading-[1.75rem] first:pl-0 text-nowrap"
      href={href}
      target="_blank"
    >
      {/* Replace spaces with non-breaking space to avoid wrapping in Safari */}
      {title.replace(/\s/g, '\u00A0')}
    </a>
  )
}

async function Pill({
  title,
  icon,
  link,
}: {
  title: string | null
  icon: React.ReactNode
  link: string | null
}) {
  const Wrapper = ({
    link,
    children,
  }: {
    link: string | null
    children: React.ReactNode
  }) =>
    link ? (
      <a className="hover:underline" href={link} target="_blank">
        {children}
      </a>
    ) : (
      <span>{children}</span>
    )

  return (
    <Wrapper link={link}>
      <div className="text-nowrap flex gap-1 items-center text-xs border border-zinc-800 dark:border-white dark:bg-zinc-900 rounded-s-full rounded-e-full w-fit p-1 pr-2">
        {icon} {title}
      </div>
    </Wrapper>
  )
}

async function TechnologyIcon({
  icon,
}: {
  icon: {
    importPath?: string | undefined
    componentName?: string | undefined
  } | null
}) {
  if (!icon) {
    return <VscCode />
  }

  const { importPath, componentName } = icon

  if (!importPath || !componentName) {
    return <VscCode />
  }

  try {
    // @ts-expect-error Not getting the correct type for imports
    const iconPackage: { [key: string]: IconType | undefined } =
      await getIconImport(importPath)

    const Icon = iconPackage[componentName]
    if (!Icon) {
      throw new Error(
        `Failed to import icon from react-icons/${importPath}/${componentName}`,
      )
    }
    return <Icon />
  } catch (error) {
    console.error(error)
    return <VscCode />
  }
}

const getIconImport = (moduleId: string) => {
  switch (moduleId) {
    case 'ci':
      return import('react-icons/ci')
    case 'fa':
      return import('react-icons/fa')
    case 'fa6':
      return import('react-icons/fa6')
    case 'io':
      return import('react-icons/io')
    case 'io5':
      return import('react-icons/io5')
    case 'md':
      return import('react-icons/md')
    case 'ti':
      return import('react-icons/ti')
    case 'go':
      return import('react-icons/go')
    case 'fi':
      return import('react-icons/fi')
    case 'lu':
      return import('react-icons/lu')
    case 'gi':
      return import('react-icons/gi')
    case 'wi':
      return import('react-icons/wi')
    case 'di':
      return import('react-icons/di')
    case 'ai':
      return import('react-icons/ai')
    case 'bs':
      return import('react-icons/bs')
    case 'ri':
      return import('react-icons/ri')
    case 'fc':
      return import('react-icons/fc')
    case 'gr':
      return import('react-icons/gr')
    case 'hi':
      return import('react-icons/hi')
    case 'hi2':
      return import('react-icons/hi2')
    case 'si':
      return import('react-icons/si')
    case 'sl':
      return import('react-icons/sl')
    case 'im':
      return import('react-icons/im')
    case 'bi':
      return import('react-icons/bi')
    case 'cg':
      return import('react-icons/cg')
    case 'vsc':
      return import('react-icons/vsc')
    case 'tb':
      return import('react-icons/tb')
    case 'tfi':
      return import('react-icons/tfi')
    case 'rx':
      return import('react-icons/rx')
    case 'pi':
      return import('react-icons/pi')
    case 'lia':
      return import('react-icons/lia')
    default:
      throw new Error(`Unknown icon package: ${moduleId}`)
  }
}
