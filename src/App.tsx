import { RouterProvider } from 'react-router-dom';
import router from '@/pages/routers';
import '@/styles/global.css';
import { AuthProvider } from '@/context/UserProfileContext';

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router()} />
      </AuthProvider>
    </>
  );
}

export default App;
