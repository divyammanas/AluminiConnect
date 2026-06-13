import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { SignInPage } from '../features/auth/pages/SignInPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { LandingPage } from '../features/home/pages/LandingPage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/dashboard', element: <DashboardPage /> }
    ]
  }
]);

