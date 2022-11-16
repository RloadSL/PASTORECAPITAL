import { on_cloud_firebase } from 'infrastructure/firebase/config';
import { WP_HOST } from 'infrastructure/wordpress/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import './WordpressHeader.module.scss'

/**
 * Componente para añadir las depencias de worpdress
 */

const WordpressHeader = ({ title, metaDescription, metaThumbnail }: any) => {
  const { asPath } = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:type" content="article" />
      <meta name="og:title" content={title} />
      <meta name="og:url" content={asPath} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:image" content={metaThumbnail} />
      <link rel='stylesheet' href={`${WP_HOST}wp-includes/css/dist/block-library/style.min.css`} />
      <link rel='stylesheet' href={`${WP_HOST}wp-content/themes/generatepress_child/style.css`} />
    </Head>
  )
}

export default WordpressHeader;