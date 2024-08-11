import React, { createContext, useState, useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import supabase from '@/api/supabaseApi';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  isSession: Session | null;
  profileNickname: string | null;
  profileImageUrl: string | null;
  signOut: () => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//QueryClient쿼리 상태를 관리하며, 로딩, 성공, 실패 등의 상태를 추적
// 애플리케이션 내의 모든 컴포넌트에서 react-query의 훅 (useQuery, useMutation 등)을 사용할 수 있게 됩니다.
const queryClient = new QueryClient();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSession, setIsSession] = useState<Session | null>(null);
  const [profileNickname, setProfileNickname] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfileNickname = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('nickname, profile_image')
      .eq('id', userId)
      .single();

    if (error) {
      return;
    } else {
      setProfileNickname(data?.nickname);
      setProfileImageUrl(data?.profile_image);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSession(session);
      if (session) {
        fetchProfileNickname(session.user?.id);
      }
    });
    setLoading(false);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const uploadProfileImage = async (file: File): Promise<void> => {
    if (!isSession) throw new Error('No session');

    if (profileImageUrl) {
      const filePathToDelete = profileImageUrl.split('/').pop();
      await supabase.storage.from('images').remove([filePathToDelete ?? '']);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${isSession.user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    const publicURL = data.publicUrl;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ profile_image: publicURL })
      .eq('id', isSession.user.id);

    if (updateError) {
      throw updateError;
    }

    setProfileImageUrl(publicURL);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          isSession,
          profileNickname,
          profileImageUrl,
          uploadProfileImage,
          signOut,
        }}
      >
        {!loading && children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
