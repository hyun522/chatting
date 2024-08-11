import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { useAuth } from '@/context/UserProfileContext';
import FriendRecommendations from '@/components/landing/FriendRecommendations';
import Chat from '@/components/Chat';

const Landing: React.FC = () => {
  const { profileNickname, profileImageUrl, uploadProfileImage } = useAuth();
  // 로그인한 유저가 선택한 상대방 ID
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mutation = useMutation(uploadProfileImage, {
    onSuccess: () => {
      alert('이미지가 업로드 되었습니다.');
    },
    onError: (error: any) => {
      alert('Error uploading profile image: ' + error.message);
    },
  });

  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      mutation.mutate(file);
    }
  };

  // 채팅을 시작하는 함수: FriendRecommendations 컴포넌트에서 호출됨
  const handleChatStart = (friendId: string) => {
    setSelectedFriendId(friendId);
  };

  // 채팅을 종료하는 함수
  const handleChatClose = () => {
    setSelectedFriendId(null);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      {selectedFriendId ? (
        <Chat selectedFriendId={selectedFriendId} onClose={handleChatClose} />
      ) : (
        <>
          <div className='relative h-[15rem] bg-gradient-to-br from-blue-500 via-indigo-500 via-pink-500 to-pink-500'>
            <div className='absolute bottom-[-7rem] left-1/2 transform -translate-x-1/2 text-center'>
              <div
                onClick={handleProfileImageClick}
                className='w-48 h-48 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center cursor-pointer'
              >
                {mutation.isLoading ? (
                  <div className='flex items-center justify-center'>
                    Loading..
                  </div>
                ) : profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt='Profile'
                    className='w-full h-full rounded-full'
                  />
                ) : (
                  <span className='text-white text-4xl'>+</span>
                )}
              </div>
              <input
                type='file'
                ref={fileInputRef}
                className='hidden'
                onChange={handleFileChange}
              />
              {profileNickname && (
                <h2 className="text-black text-24 mt-4 font-['KimjungchulMyungjo-Bold']">
                  {profileNickname}
                </h2>
              )}
            </div>
          </div>
          <div className='bg-gray-100 flex-grow'>
            <FriendRecommendations
              currentNickname={profileNickname}
              onStartChat={handleChatStart}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
