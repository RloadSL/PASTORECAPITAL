const WP_HOST = 'http://localhost:8888/pastoreheadless/';
const WP_API = `${WP_HOST}wp-json/wp/v2/`;

export const WP_API_CATEGORY = `${WP_API}categories`;
export const WP_API_PAGES = `${WP_API}pages`;
export const WP_API_PAGES_LIST = `${WP_API}pages?context=embed&per_page=3&orderby=date&order=desc`;
export const WP_EDIT_POST = `${WP_HOST}wp-admin/post.php`; 
export const POSTS_API_URL = `${WP_API}posts`
export const AUTHORS_API_URL = `${WP_API}users`
export const MEDIA_API_URL = `${WP_API}media`