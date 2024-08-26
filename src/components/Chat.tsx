import React, { useState, useEffect } from 'react';
import supabase from '@/api/supabaseApi';
import { FiX } from 'react-icons/fi';
import { useAuth } from '@/context/userProfileContext';

type MessageType = {
  id: string;
  chat_room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

const Chat: React.FC<{ selectedFriendId: string; onClose: () => void }> = ({
  selectedFriendId,
  onClose,
}) => {
  const { currentSession } = useAuth();
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [friendProfile, setFriendProfile] = useState<{
    id: string;
    nickname: string;
    profile_image: string;
  } | null>(null);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, nickname, profile_image')
        .eq('id', selectedFriendId)
        .single();

      if (error) return;
      else setFriendProfile(data);
    };

    fetchFriendProfile();
  }, [selectedFriendId]);

  useEffect(() => {
    const createOrFetchChatRoom = async () => {
      const userId = currentSession?.user.id;

      const { data: existingRooms, error } = await supabase
        .from('chat_room')
        .select('id')
        .or(
          `and(user1_id.eq.${userId},user2_id.eq.${selectedFriendId}),and(user1_id.eq.${selectedFriendId},user2_id.eq.${userId})`
        );

      if (error) {
        return;
      }

      if (existingRooms.length > 0) {
        setChatRoomId(existingRooms[0].id);
      } else {
        // Create a new chat room
        const { data: newRoom, error: createError } = await supabase
          .from('chat_room')
          .insert([{ user1_id: userId, user2_id: selectedFriendId }])
          .select() // 여기서 새로 생성된 채팅방의 데이터를 반환
          .single();

        if (createError) {
          return;
        } else {
          setChatRoomId(newRoom.id);
        }
      }
    };

    createOrFetchChatRoom();
  }, [selectedFriendId]);

  useEffect(() => {
    if (!chatRoomId) return;

    const fetchMessages = async (roomId: string) => {
      const { data, error } = await supabase
        .from('message')
        .select('*')
        .eq('chat_room_id', roomId)
        .order('created_at', { ascending: true });

      if (error) {
        return;
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages(chatRoomId);

    const channel = supabase
      .channel(`chat-room-${chatRoomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
          filter: `chat_room_id=eq.${chatRoomId}`,
        },
        (payload) => {
          const newMessage: MessageType = payload.new as MessageType;
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatRoomId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !chatRoomId) return;

    const userId = currentSession?.user.id;

    const { error } = await supabase
      .from('message')
      .insert([
        { chat_room_id: chatRoomId, sender_id: userId, content: newMessage },
      ]);

    if (error) {
      return;
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className='flex flex-col min-h-screen p-7 relative'>
      <button
        onClick={onClose}
        className='w-[3rem] h-[3rem] flexCenter bg-gray-700 text-white opacity-40 rounded-full absolute top-[3rem] right-[3rem]'
      >
        <FiX />
      </button>

      {friendProfile && (
        <div className='flex flex-col flex-grow bg-gray-200 p-4 rounded shadow-lg'>
          <div className='flex items-center mb-10'>
            {friendProfile.profile_image ? (
              <img
                src={friendProfile.profile_image}
                alt={friendProfile.nickname}
                className='w-16 h-16 rounded-full mr-4'
              />
            ) : (
              <div className='w-16 h-16 rounded-full bg-gray-900'></div>
            )}
            <h2 className='text-2xl font-semibold'>{friendProfile.nickname}</h2>
          </div>

          <div className='flex flex-col flex-grow mb-4 overflow-y-auto chat-container'>
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-2 p-2 rounded ${message.sender_id === currentSession?.user.id ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}
                >
                  <p>{message.content}</p>
                  <span className='text-xs text-gray-500'>
                    {new Date(message.created_at).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <p className='text-center text-gray-500'>No messages yet.</p>
            )}
          </div>

          <div className='flex mt-4'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='Type a message...'
              className='flex-grow p-2 border rounded-l'
            />
            <button
              onClick={sendMessage}
              className='px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600 transition duration-300'
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
