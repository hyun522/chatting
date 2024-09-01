import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { useAuth } from '@/context/userProfileContext';
import FriendRecommendations from '@/components/landing/FriendRecommendations';
import Chat from '@/components/Chat';
import supabase from '@/api/supabaseApi';

const Landing: React.FC = () => {
  const {
    currentSession,
    profileNickname,
    profileImageUrl,
    uploadProfileImage,
  } = useAuth();
  // 로그인한 유저가 선택한 상대방 ID
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);

  const mutation = useMutation(uploadProfileImage, {
    onSuccess: () => {
      alert('이미지가 업로드 되었습니다.');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert('Error uploading profile image: ' + error.message);
      } else {
        alert('Error uploading profile image: ' + String(error));
      }
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

  const handleChatStart = async (friendId: string) => {
    setSelectedFriendId(friendId);

    const currentId = currentSession?.user.id;
    if (!currentId) return;
    // 채팅을 시작하는 함수: FriendRecommendations 컴포넌트에서 호출됨
    const [user1_id, user2_id] =
      currentId < friendId ? [currentId, friendId] : [friendId, currentId];
    // 항상 작은 ID를 user1_id로, 큰 ID를 user2_id로 설정

    try {
      const { data: existingRooms, error } = await supabase
        .from('chat_room')
        .select('id')
        .eq('user1_id', user1_id)
        .eq('user2_id', user2_id);

      console.log(existingRooms);

      if (error) {
        console.error('Error fetching chat room:', error);
        return;
      }

      if (existingRooms && existingRooms.length > 0) {
        // 기존 채팅방이 있으면 그 채팅방의 ID를 사용
        setChatRoomId(existingRooms[0].id);
      } else {
        // 채팅방이 없으면 새로 생성
        const { data: newRoom, error: createError } = await supabase
          .from('chat_room')
          .insert([{ user1_id, user2_id }])
          .select() // 새로 생성된 채팅방의 데이터를 반환
          .single();

        if (createError) {
          console.error('Error creating chat room:', createError);
          return;
        }

        setChatRoomId(newRoom.id);
      }
    } catch (err) {
      console.error('Error starting chat:', err);
      return;
    }
  };

  // 채팅을 종료하는 함수
  const handleChatClose = () => {
    setSelectedFriendId(null);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      {selectedFriendId ? (
        <Chat
          chatRoomId={chatRoomId}
          selectedFriendId={selectedFriendId}
          onClose={handleChatClose}
        />
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
