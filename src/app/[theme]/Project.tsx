import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { FEATURED_PROJECTS_QUERYResult } from '@/sanity/types'
import { getImageDimensions } from '@sanity/asset-utils'
import { PortableText } from 'next-sanity'
import { VscCode } from 'react-icons/vsc'

export function ProjectPreview({
  project,
}: {
  project: NonNullable<
    NonNullable<
      NonNullable<FEATURED_PROJECTS_QUERYResult>['listMembers']
    >[number]
  > & {
    title: string
    mainImage: {
      asset: {
        _id: string
        url: string
      }
    }
    technologies: {
      name: string
      link: string
    }
  }
}) {
  return (
    <div className="flex flex-col gap-4 group">
      <h3 className="text-xl">{project.title}</h3>
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
            {project.links.map((link) =>
              link.url && link.title ? (
                <a
                  className="hover:underline pl-2 leading-[1.75rem] first:pl-0 text-nowrap"
                  key={link._key}
                  href={link.url}
                  target="_blank"
                >
                  {/* Replace spaces with non-breaking space to avoid wrapping in Safari */}
                  {link.title.replace(/\s/g, '\u00A0')}
                </a>
              ) : null,
            )}
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
    NonNullable<FEATURED_PROJECTS_QUERYResult>['listMembers']
  >[number],
): project is NonNullable<
  NonNullable<
    NonNullable<FEATURED_PROJECTS_QUERYResult>['listMembers']
  >[number] & {
    title: string
    mainImage: {
      asset: {
        _id: string
        url: string
      }
    }
    technologies: {
      name: string
      link: string
    }
  }
> => {
  return Boolean(
    project && project.title && project.mainImage && project.mainImage.asset,
  )
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
