import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ChattingListTab from '@/components/ChattingListTab';
import { useState } from 'react';

function Layout() {
  const [isChattingListOpen, setIsChattingListOpen] = useState(false);
  const location = useLocation();

  const handleChatIconClick = () => {
    setIsChattingListOpen(!isChattingListOpen);
  };

  const isAuthRoute =
    location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div>
      {!isAuthRoute && <Sidebar onChatIconClick={handleChatIconClick} />}
      {isChattingListOpen && <ChattingListTab />}
      <Outlet />
    </div>
  );
}

export default Layout;
