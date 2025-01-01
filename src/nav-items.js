import Library from './pages/Library';
import Groups from './pages/Groups';

export const navItems = [
  {
    to: 'library',
    component: Library,
    dynamicRoutes: true
  },
  {
    to: 'groups',
    component: Groups,
    dynamicRoutes: true
  }
];
