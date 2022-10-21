import { on_cloud_firebase } from 'infrastructure/firebase/config';
import { WP_HOST } from 'infrastructure/wordpress/config';
import Head from 'next/head';
import './WordpressHeader.module.scss'

/**
 * Componente para añadir las depencias de worpdress
 */

const WordpressHeader = ( ) => {

  return (
    <Head>
      <link rel='stylesheet' href={`${WP_HOST}wp-includes/css/dist/block-library/style.min.css`}/>
      <link rel='stylesheet' href={`${WP_HOST}wp-content/themes/generatepress_child/style.css`}/>
    </Head>
  )
}

export default WordpressHeader;