/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type Page = {
  _id: string
  _type: 'page'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
}

export type ProjectsList = {
  _id: string
  _type: 'projectsList'
  _createdAt: string
  _updatedAt: string
  _rev: string
  id?: string
  listTitle?: string
  listMembers?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'project'
  }>
}

export type Technology = {
  _id: string
  _type: 'technology'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
  description?: string
  link?: string
  icon?: {
    importPath?:
      | 'fa'
      | 'ci'
      | 'fa6'
      | 'io'
      | 'io5'
      | 'md'
      | 'ti'
      | 'go'
      | 'fi'
      | 'lu'
      | 'gi'
      | 'wi'
      | 'di'
      | 'ai'
      | 'bs'
      | 'ri'
      | 'fc'
      | 'gr'
      | 'hi'
      | 'hi2'
      | 'si'
      | 'sl'
      | 'im'
      | 'bi'
      | 'cg'
      | 'vsc'
      | 'tb'
      | 'tfi'
      | 'rx'
      | 'pi'
      | 'lia'
    componentName?: string
  }
  projects?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'project'
  }>
}

export type Project = {
  _id: string
  _type: 'project'
  _createdAt: string
  _updatedAt: string
  _rev: string
  index?: number
  title?: string
  slug?: Slug
  author?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'author'
  }
  mainImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    alt?: string
    _type: 'image'
  }
  contentImages?: Array<{
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    alt?: string
    _type: 'image'
    _key: string
  }>
  technologies?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'technology'
  }>
  categories?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'category'
  }>
  publishedAt?: string
  body?: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
        listItem?: 'bullet'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }
    | {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        alt?: string
        _type: 'image'
        _key: string
      }
  >
  links?: Array<{
    title?: string
    url?: string
    _type: 'link'
    _key: string
  }>
}

export type Post = {
  _id: string
  _type: 'post'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  author?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'author'
  }
  mainImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    alt?: string
    _type: 'image'
  }
  categories?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'category'
  }>
  publishedAt?: string
  body?: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
        listItem?: 'bullet'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }
    | {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        alt?: string
        _type: 'image'
        _key: string
      }
  >
}

export type Author = {
  _id: string
  _type: 'author'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  bio?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal'
    listItem?: never
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }>
}

export type Category = {
  _id: string
  _type: 'category'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  description?: string
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type BlockContent = Array<
  | {
      children?: Array<{
        marks?: Array<string>
        text?: string
        _type: 'span'
        _key: string
      }>
      style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
      listItem?: 'bullet'
      markDefs?: Array<{
        href?: string
        _type: 'link'
        _key: string
      }>
      level?: number
      _type: 'block'
      _key: string
    }
  | {
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      alt?: string
      _type: 'image'
      _key: string
    }
>

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Page
  | ProjectsList
  | Technology
  | Project
  | Post
  | Author
  | Category
  | Slug
  | BlockContent
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ./src/app/[theme]/layout.tsx
// Variable: PAGES_NAVIGATION_QUERY
// Query: *[_type == "page"] | {title, slug}
export type PAGES_NAVIGATION_QUERYResult = Array<{
  title: string | null
  slug: Slug | null
}>

// Source: ./src/app/[theme]/page.tsx
// Variable: FEATURED_PROJECTS_QUERY
// Query: *[_type == "projectsList" && _id == "45c3a012-4053-462a-847c-e0650a5e1092"][0] | {    _id,    listTitle,    listMembers[]->{..., mainImage{..., asset->{...}}, technologies[]->{...}}  }
export type FEATURED_PROJECTS_QUERYResult = {
  _id: string
  listTitle: string | null
  listMembers: Array<{
    _id: string
    _type: 'project'
    _createdAt: string
    _updatedAt: string
    _rev: string
    index?: number
    title?: string
    slug?: Slug
    author?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'author'
    }
    mainImage: {
      asset: {
        _id: string
        _type: 'sanity.imageAsset'
        _createdAt: string
        _updatedAt: string
        _rev: string
        originalFilename?: string
        label?: string
        title?: string
        description?: string
        altText?: string
        sha1hash?: string
        extension?: string
        mimeType?: string
        size?: number
        assetId?: string
        uploadId?: string
        path?: string
        url?: string
        metadata?: SanityImageMetadata
        source?: SanityAssetSourceData
      } | null
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      alt?: string
      _type: 'image'
    } | null
    contentImages?: Array<{
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      alt?: string
      _type: 'image'
      _key: string
    }>
    technologies: Array<{
      _id: string
      _type: 'technology'
      _createdAt: string
      _updatedAt: string
      _rev: string
      name?: string
      slug?: Slug
      description?: string
      link?: string
      icon?: {
        importPath?:
          | 'ai'
          | 'bi'
          | 'bs'
          | 'cg'
          | 'ci'
          | 'di'
          | 'fa'
          | 'fa6'
          | 'fc'
          | 'fi'
          | 'gi'
          | 'go'
          | 'gr'
          | 'hi'
          | 'hi2'
          | 'im'
          | 'io'
          | 'io5'
          | 'lia'
          | 'lu'
          | 'md'
          | 'pi'
          | 'ri'
          | 'rx'
          | 'si'
          | 'sl'
          | 'tb'
          | 'tfi'
          | 'ti'
          | 'vsc'
          | 'wi'
        componentName?: string
      }
      projects?: Array<{
        _ref: string
        _type: 'reference'
        _weak?: boolean
        _key: string
        [internalGroqTypeReferenceTo]?: 'project'
      }>
    }> | null
    categories?: Array<{
      _ref: string
      _type: 'reference'
      _weak?: boolean
      _key: string
      [internalGroqTypeReferenceTo]?: 'category'
    }>
    publishedAt?: string
    body?: Array<
      | {
          children?: Array<{
            marks?: Array<string>
            text?: string
            _type: 'span'
            _key: string
          }>
          style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'normal'
          listItem?: 'bullet'
          markDefs?: Array<{
            href?: string
            _type: 'link'
            _key: string
          }>
          level?: number
          _type: 'block'
          _key: string
        }
      | {
          asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
          }
          hotspot?: SanityImageHotspot
          crop?: SanityImageCrop
          alt?: string
          _type: 'image'
          _key: string
        }
    >
    links?: Array<{
      title?: string
      url?: string
      _type: 'link'
      _key: string
    }>
  }> | null
} | null
// Variable: ALL_PROJECTS_QUERY
// Query: *[_type == "projectsList" && _id == "15a3c4ec-0d3b-428c-8a9f-f7d2d54ef7eb"][0] | {    _id,    listTitle,    listMembers[]->{..., mainImage{..., asset->{...}}, technologies[]->{...}}  }
export type ALL_PROJECTS_QUERYResult = {
  _id: string
  listTitle: string | null
  listMembers: Array<{
    _id: string
    _type: 'project'
    _createdAt: string
    _updatedAt: string
    _rev: string
    index?: number
    title?: string
    slug?: Slug
    author?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'author'
    }
    mainImage: {
      asset: {
        _id: string
        _type: 'sanity.imageAsset'
        _createdAt: string
        _updatedAt: string
        _rev: string
        originalFilename?: string
        label?: string
        title?: string
        description?: string
        altText?: string
        sha1hash?: string
        extension?: string
        mimeType?: string
        size?: number
        assetId?: string
        uploadId?: string
        path?: string
        url?: string
        metadata?: SanityImageMetadata
        source?: SanityAssetSourceData
      } | null
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      alt?: string
      _type: 'image'
    } | null
    contentImages?: Array<{
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      alt?: string
      _type: 'image'
      _key: string
    }>
    technologies: Array<{
      _id: string
      _type: 'technology'
      _createdAt: string
      _updatedAt: string
      _rev: string
      name?: string
      slug?: Slug
      description?: string
      link?: string
      icon?: {
        importPath?:
          | 'ai'
          | 'bi'
          | 'bs'
          | 'cg'
          | 'ci'
          | 'di'
          | 'fa'
          | 'fa6'
          | 'fc'
          | 'fi'
          | 'gi'
          | 'go'
          | 'gr'
          | 'hi'
          | 'hi2'
          | 'im'
          | 'io'
          | 'io5'
          | 'lia'
          | 'lu'
          | 'md'
          | 'pi'
          | 'ri'
          | 'rx'
          | 'si'
          | 'sl'
          | 'tb'
          | 'tfi'
          | 'ti'
          | 'vsc'
          | 'wi'
        componentName?: string
      }
      projects?: Array<{
        _ref: string
        _type: 'reference'
        _weak?: boolean
        _key: string
        [internalGroqTypeReferenceTo]?: 'project'
      }>
    }> | null
    categories?: Array<{
      _ref: string
      _type: 'reference'
      _weak?: boolean
      _key: string
      [internalGroqTypeReferenceTo]?: 'category'
    }>
    publishedAt?: string
    body?: Array<
      | {
          children?: Array<{
            marks?: Array<string>
            text?: string
            _type: 'span'
            _key: string
          }>
          style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'normal'
          listItem?: 'bullet'
          markDefs?: Array<{
            href?: string
            _type: 'link'
            _key: string
          }>
          level?: number
          _type: 'block'
          _key: string
        }
      | {
          asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
          }
          hotspot?: SanityImageHotspot
          crop?: SanityImageCrop
          alt?: string
          _type: 'image'
          _key: string
        }
    >
    links?: Array<{
      title?: string
      url?: string
      _type: 'link'
      _key: string
    }>
  }> | null
} | null

// Source: ./src/app/[theme]/[slug]/page.tsx
// Variable: PAGES_QUERY
// Query: *[_type == "page"] | {...}
export type PAGES_QUERYResult = Array<{
  _id: string
  _type: 'page'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
}>

// Query TypeMap
import '@sanity/client'
declare module '@sanity/client' {
  interface SanityQueries {
    '*[_type == "page"] | {title, slug}': PAGES_NAVIGATION_QUERYResult
    '*[_type == "projectsList" && _id == "45c3a012-4053-462a-847c-e0650a5e1092"][0] | {\n    _id,\n    listTitle,\n    listMembers[]->{..., mainImage{..., asset->{...}}, technologies[]->{...}}\n  }': FEATURED_PROJECTS_QUERYResult
    '*[_type == "projectsList" && _id == "15a3c4ec-0d3b-428c-8a9f-f7d2d54ef7eb"][0] | {\n    _id,\n    listTitle,\n    listMembers[]->{..., mainImage{..., asset->{...}}, technologies[]->{...}}\n  }': ALL_PROJECTS_QUERYResult
    '*[_type == "page"] | {...}': PAGES_QUERYResult
  }
}
