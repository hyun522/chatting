import '@/styles/global.css';
import { AuthProvider } from '@/context/UserProfileContext';
import Routers from '@/components/Routers';

function App() {
  return (
    <>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </>
  );
}

export default App;
