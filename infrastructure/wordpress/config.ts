import { on_cloud_firebase, on_cloud_wp } from "infrastructure/firebase/config";
import { boolean } from "yup";

console.log(on_cloud_firebase && on_cloud_wp)
export const WP_HOST = on_cloud_firebase && on_cloud_wp ? 'https://rload.es/apipastore/' : 'http://localhost:8888/pastoreheadless/' ;

const WP_API = `${WP_HOST}wp-json/wp/v2/`;

export const WP_API_CATEGORY = `${WP_API}categories`;
export const WP_API_TAGS = `${WP_API}tags`;
export const WP_API_PAGES = `${WP_API}pages`;
export const WP_EDIT_POST = `${WP_HOST}wp-admin/post.php`; 
export const WP_API_PAGES_LIST = `${WP_API}pages?per_page=5&orderby=date`;
export const WP_API_POST = `${WP_API}posts`;
export const WP_API_POST_LIST = `${WP_API}posts?per_page=5&orderby=date`;


