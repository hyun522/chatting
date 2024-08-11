import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from '@/pages/signin';
import Signup from '@/pages/signup';
import Landing from '@/pages/landing';
import Layout from '@/components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Signin />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'landing',
        element: <Landing />,
      },
    ],
  },
]);
function Routers() {
  return <RouterProvider router={router} />;
}

export default Routers;
