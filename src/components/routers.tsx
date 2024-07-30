import { createBrowserRouter } from 'react-router-dom';
import Signin from '@/pages/signin';
import Signup from '@/pages/signup';
import Layout from '@/components/layout';
import Landing from '@/pages/landing';

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
