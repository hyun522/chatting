import { IoChatboxSharp } from 'react-icons/io5';
import { IoHomeSharp } from 'react-icons/io5';
import { RiLogoutBoxRFill } from 'react-icons/ri';

interface SidebarProps {
  onChatIconClick: () => void;
}

function Sidebar({ onChatIconClick }: SidebarProps) {
  return (
    <div className='fixed top-0 left-0 h-screen w-[15rem] flex border-r'>
      <div className='flex-grow flex flex-col items-center space-y-10 py-[2rem]'>
        <h2 className="text-[1.8rem] text-gray-700 font-['KimjungchulMyungjo-Bold'] pb-[2rem]">
          T vvith M
        </h2>
        <span></span>
        <IoHomeSharp className='w-8 h-8 text-gray-700 cursor-pointer hover:text-black hover:scale-110' />
        <IoChatboxSharp
          className='w-8 h-8 text-gray-700 cursor-pointer hover:text-black hover:scale-110'
          onClick={onChatIconClick}
        />
        <div className='flex-grow'></div>
        <RiLogoutBoxRFill className='w-8 h-8 text-gray-700  cursor-pointer hover:text-black hover:scale-110' />
      </div>
    </div>
  );
}

export default Sidebar;
