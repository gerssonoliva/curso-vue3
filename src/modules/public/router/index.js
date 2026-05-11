import aboutRoutes from '@/modules/public/about/router/index';
import homeRoutes from '@/modules/public/home/router/index';
import contactRoutes from '@/modules/public/contact/router/index';
import blogRoutes from '@/modules/public/blog/router/index';

const routes = [
  ...aboutRoutes,
  ...homeRoutes,
  ...contactRoutes,
  ...blogRoutes,
]

export default routes;