import { RouterProvider } from 'react-router-dom';
import router from '@/components/routers';
import '@/styles/global.css';

function App() {
  return (
    <>
      <RouterProvider router={router()} />
    </>
  );
}

export default App;
