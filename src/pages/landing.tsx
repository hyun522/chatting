import React, { useRef } from 'react';
import { useMutation } from 'react-query';
import { useAuth } from '@/context/UserProfileContext';

const Landing: React.FC = () => {
  const { profileNickname, profileImageUrl, uploadProfileImage } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mutation = useMutation(uploadProfileImage, {
    // 서버와 통신하는 함수가 들어가야 합니다.
    //첫 번째 인자로 변이 함수를 전달합니다
    //두 번째 인자로 옵션 객체를 전달하여 변이 작업의 다양한 상태 변화에 대응하는 콜백 함수들을 정의합니다.
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
      // mutate 메서드를 포함하여 변이 작업을 실행
      // await uploadProfileImage(file);과 같은 역할을 한다.
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative h-[15rem] bg-gradient-to-br from-blue-500 via-indigo-500 via-pink-500 to-pink-500'>
        <div className='absolute bottom-[-7rem] left-1/2 transform -translate-x-1/2 text-center'>
          <div
            onClick={handleProfileImageClick}
            className='w-48 h-48 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center cursor-pointer'
          >
            {mutation.isLoading ? (
              <div className='flex items-center justify-center'>Loading..</div>
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
            <h2 className="text-black text-[2rem] mt-4 font-['KimjungchulMyungjo-Bold']">
              {profileNickname}
            </h2>
          )}
        </div>
      </div>
      <div className='bg-gray-100 flex-grow'></div>
    </div>
  );
};

export default Landing;
