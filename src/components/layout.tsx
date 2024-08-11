import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ChattingListTab from '@/components/ChattingListTab';
import { useState } from 'react';

function Layout() {
  //로그인 안하면 접근 못하게
  const [isChattingListOpen, setIsChattingListOpen] = useState(false);
  const location = useLocation();

  const handleChatIconClick = () => {
    setIsChattingListOpen(!isChattingListOpen);
  };

  const isAuthRoute =
    location.pathname === '/' || location.pathname === '/signup';

  return (
    <div className='flex h-screen'>
      {!isAuthRoute && <Sidebar onChatIconClick={handleChatIconClick} />}
      <div className='flex-grow ml-[18rem]'>
        {isChattingListOpen && (
          <div className='absolute top-0 right-0'>
            <ChattingListTab />
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
