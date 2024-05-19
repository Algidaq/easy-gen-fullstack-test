import { useNavigate } from 'react-router-dom';
import { dashboardRoutes } from './routes';
import { profileRoute } from './pages';

// eslint-disable-next-line @typescript-eslint/no-namespace
module DashboardModule {
  export const routes = dashboardRoutes;

  export const useDashboardRouter = () => {
    const navigate = useNavigate();

    const navigateToProfile = () => {
      navigate(profileRoute.path ?? '', { replace: true });
    };

    return Object.freeze({ navigateToProfile });
  };
}

export default DashboardModule;
