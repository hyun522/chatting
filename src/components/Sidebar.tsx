import { useNavigate } from 'react-router-dom';
import supabase from '@/api/supabaseApi';
import { IoChatboxSharp } from 'react-icons/io5';
import { IoHomeSharp } from 'react-icons/io5';
import { RiLogoutBoxRFill } from 'react-icons/ri';

interface SidebarProps {
  onChatIconClick: () => void;
}

function Sidebar({ onChatIconClick }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-[18rem] flex border-r'>
      <div className='flex-grow flex flex-col items-center space-y-10 py-[5rem]'>
        <h2 className="text-24 text-gray-700 font-['KimjungchulMyungjo-Bold'] pb-[2rem]">
          T vvith M
        </h2>
        <IoHomeSharp className='w-8 h-8 text-gray-700 cursor-pointer hover:text-black hover:scale-110' />
        <IoChatboxSharp
          className='w-8 h-8 text-gray-700 cursor-pointer hover:text-black hover:scale-110'
          onClick={onChatIconClick}
        />
        <div className='flex-grow'></div>
        <RiLogoutBoxRFill
          onClick={handleLogout}
          className='w-8 h-8 text-gray-700  cursor-pointer hover:text-black hover:scale-110'
        />
      </div>
    </div>
  );
}

export default Sidebar;
