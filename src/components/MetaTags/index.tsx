import Head from 'next/head'

import { MetaTagsProps } from './types'

export const MetaTags = (props: MetaTagsProps) => {
  const { title, description, canonical, image } = props
  const pageTitle = title ? `${title} | auth-flow` : 'auth-flow'
  const pageDescription =
    description ??
    `auth-flow => A app to help you test how to implement a authentication flow in your application.`
  const pageImage = image ?? `/thumb.svg`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="auth, trial, authentication, flow, tmowes"
      />

      <meta property="og:site_name" content="auth-flow" />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={pageTitle} />
      <meta
        name="og:description"
        property="og:description"
        content={pageDescription}
      />
      <meta property="og:url" content={`${canonical}`} />
      <meta property="og:image" content={pageImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="auth-flow" />
      <meta name="twitter:creator" content="Julius Mowes" />
      <meta name="twitter:image:alt" content="Thumbnail" />
      {pageImage && <meta name="twitter:image" content={pageImage} />}

      {canonical && <link rel="canonical" href={canonical} />}

      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
    </Head>
  )
}
