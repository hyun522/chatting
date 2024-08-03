import { RouterProvider } from 'react-router-dom';
import router from '@/pages/routers';
import '@/styles/global.css';

function App() {
  return (
    <>
      <RouterProvider router={router()} />
    </>
  );
}

export default App;
