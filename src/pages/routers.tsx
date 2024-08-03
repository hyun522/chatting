import { createBrowserRouter } from 'react-router-dom';
import Signin from '@/pages/signin';
import Signup from '@/pages/signup';
import Landing from '@/pages/landing';
import Layout from '@/components/Layout';

function routers() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Landing />,
        },
        {
          path: 'signin',
          element: <Signin />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
      ],
    },
  ]);
  return router;
}

export default routers;
