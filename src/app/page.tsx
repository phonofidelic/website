import { Metadata } from 'next'
import Image from 'next/image'
import { defineQuery, PortableText } from 'next-sanity'
import { VscCode } from 'react-icons/vsc'
import { client } from '@/sanity/lib/client'
import { getImageDimensions } from '@sanity/asset-utils'
import { PROJECTS_QUERYResult } from '@/sanity/types'
import { IconType } from 'react-icons'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { getShowProjects } from '@/flags'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Home | Web development by Christopher Clemons',
  description:
    'Portfolio site exhibiting web development works by Christopher Clemons',
}

const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | {
      _id,
      index,
      title,
      body,
      technologies[]->{_id, name, description, icon, link},
      mainImage{..., asset->{...}},
      links[]{_key, url, title}
    } | order(index asc, _createdAt)`)

const assertValidProject = (
  project: PROJECTS_QUERYResult[number],
): project is NonNullable<
  PROJECTS_QUERYResult[number] & {
    title: string
    mainImage: {
      asset: {
        _id: string
        url: string
      }
    }
  }
> => {
  return Boolean(
    project && project.title && project.mainImage && project.mainImage.asset,
  )
}

export default async function Home() {
  const projects = await client.fetch<PROJECTS_QUERYResult>(
    PROJECTS_QUERY,
    {},
    {
      next: {
        /** 30 seconds */
        revalidate: 30,
      },
    },
  )

  const showProjects = await getShowProjects()

  return (
    <div className="w-full">
      <header className="sm:max-w-screen-sm md:max-w-screen-md mx-auto grid grid-rows-fr md:grid-rows-3 items-center h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 p-2 sm:px-20">
          <div className="flex flex-col gap-4 p-2">
            <h1 className="text-4xl max-w-xs">Christopher Clemons</h1>
            <h2 className="text-xl px-2">(Front-end web developer)</h2>
          </div>
          {showProjects ? (
            <div className="px-4">
              <p className="text-base">
                I use web technologies to build interactions between humans and
                computers.
              </p>
            </div>
          ) : (
            <div className="px-4">
              New website is on the way. In the meantime, you can reach me on{' '}
              <a
                href="https://linkedin.com/in/christopher-clemons-89182aba"
                target="_blank"
                className="underline"
              >
                LinkedIn
              </a>
            </div>
          )}
        </div>
        <div className="row-start-3 flex gap-6 w-full items-center justify-center p-2 sm:p-20 self-start">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/phonofidelic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            GitHub
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://linkedin.com/in/christopher-clemons-89182aba"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
            LinkedIn
          </a>
        </div>
      </header>
      <main className="flex sm:max-w-screen-sm md:max-w-screen-md mx-auto w-full justify-center">
        {showProjects && projects.length > 0 && (
          <div className="flex flex-col max-w-full p-2 sm:p-20">
            <div className="mb-8 bg-white dark:bg-zinc-900 sticky top-0 z-50 border-b-3 border-zinc-800 dark:border-white">
              <h2 className="text-4xl pb-2 pt-4 px-2 sm:px-0 w-full ">
                Projects
              </h2>
            </div>
            <div className="flex flex-col gap-32 pt-16 px-2">
              {projects
                .filter((project) => assertValidProject(project))
                .map((project) => (
                  <div key={project._id} className="flex flex-col gap-4 group">
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
                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="flex gap-1 w-full overflow-x-auto">
                            {project.technologies?.map(
                              ({ _id, name, icon, link }) => (
                                <Pill
                                  key={_id}
                                  title={name}
                                  icon={<TechnologyIcon icon={icon} />}
                                  link={link}
                                />
                              ),
                            )}
                          </div>
                        )}
                      {project.links && project.links.length > 0 && (
                        <div className="flex gap-x-2 divide-x divide-zinc-800 dark:divide-white text-sm text-nowrap">
                          {project.links.map((link) =>
                            link.url && link.title ? (
                              <a
                                className="hover:underline pl-2 leading-[1.75rem] first:pl-0"
                                key={link._key}
                                href={link.url}
                                target="_blank"
                              >
                                {link.title}
                              </a>
                            ) : null,
                          )}
                        </div>
                      )}
                    </div>
                    {Array.isArray(project.body) && (
                      <div className="prose">
                        <PortableText value={project.body} />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
      {showProjects && (
        <footer className="flex flex-col gap-4 items-center p-16 mt-32">
          <div className="flex w-full gap-6 items-center justify-center">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://github.com/phonofidelic"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              GitHub
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://linkedin.com/in/christopher-clemons-89182aba"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </div>
          <div>
            <p className="text-xs">
              Copyright &copy; {new Date().getFullYear()} Christopher Clemons
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}

function ProjectImage({
  image,
  projectTitle,
}: {
  image: NonNullable<PROJECTS_QUERYResult[number]['mainImage']>
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
