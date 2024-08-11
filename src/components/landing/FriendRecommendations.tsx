// 4
import { useState, useEffect } from 'react';
import supabase from '@/api/supabaseApi';

interface FriendRecommendationsProps {
  currentNickname: string | null;
  onStartChat: (friendId: string) => void;
}

function FriendRecommendations({
  currentNickname,
  onStartChat,
}: FriendRecommendationsProps) {
  //회원가입한 유저 프로필넘어옴(나를 제외)
  const [profiles, setProfiles] = useState<
    { id: string; nickname: string; profile_image: string }[]
  >([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, nickname, profile_image')
        .neq('nickname', currentNickname);
      if (error) console.error('Error fetching profiles:', error);
      else setProfiles(data);
    };

    fetchProfiles();
  }, [currentNickname]);

  return (
    <div className='container p-4'>
      <h2 className="text-2xl pt-[11rem] text-[1.8rem] mb-[2rem] font-['KimjungchulMyungjo-Bold']">
        Friend Recommendations
      </h2>
      <ul className='grid gap-4'>
        {profiles.map((profile) => (
          <div
            className='flex justify-between items-center p-4 bg-white rounded-lg shadow-md'
            key={profile.id}
          >
            <div className='flex items-center gap-4'>
              {profile.profile_image ? (
                <img
                  className='w-16 h-16 rounded-full'
                  src={profile.profile_image}
                  alt={profile.nickname}
                />
              ) : (
                <div className='w-16 h-16 rounded-full bg-gray-E'></div>
              )}
              <li className='mb-2'>{profile.nickname}</li>
            </div>
            <button
              //chatting을 하고자 클릭한상대방의 id가 올라간다.
              onClick={() => onStartChat(profile.id)}
              className='px-4 py-2 bg-orange-2 text-white rounded hover:bg-orange-3 transition duration-300'
            >
              Chat
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FriendRecommendations;
