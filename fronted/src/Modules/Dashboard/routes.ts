import { RouteObject } from 'react-router-dom';
import { DashboardLayoutPage, profileRoute } from './pages';

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    Component: DashboardLayoutPage,
    children: [profileRoute],
  },
];
