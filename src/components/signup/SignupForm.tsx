import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '@/api/supabaseApi';
import {
  getEmailValidationMessage,
  getPasswordValidationMessage,
  getNicknameValidationMessage,
} from '@/utils/validate';
import AuthInput from '@/components/common/AuthInput';
import Modal from '@/components/common/Modal';

interface formDataType {
  email: string;
  nickname: string;
  password: string;
}

function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<formDataType>({
    email: '',
    nickname: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<formDataType>({
    email: '',
    nickname: '',
    password: '',
  });

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'email') {
      setErrorMessage((preError) => ({
        ...preError,
        email: getEmailValidationMessage(value),
      }));
    }

    if (name === 'password') {
      setErrorMessage((prevError) => ({
        ...prevError,
        password: getPasswordValidationMessage(value),
      }));
    }

    if (name === 'nickname') {
      setErrorMessage((prevError) => ({
        ...prevError,
        nickname: getNicknameValidationMessage(value),
      }));
    }
  };

  const toggleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      errorMessage.email !== 'Valid' ||
      errorMessage.password !== 'Valid' ||
      errorMessage.nickname !== 'Valid' ||
      !formData.email ||
      !formData.password ||
      !formData.nickname
    )
      return;

    const { data: nicknameData } = await supabase
      .from('profiles')
      .select('nickname')
      .eq('nickname', formData.nickname);

    if (nicknameData && nicknameData.length > 0) {
      setErrorModalMessage('Nickname already exists.');
      setIsModalOpen(true);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setIsModalOpen(true);
      setErrorModalMessage(error.message);
      return;
    }

    const userId = data.user?.id;
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .insert([
        { id: userId, nickname: formData.nickname, profile_image: null },
      ]);

    if (profileError) {
      setIsModalOpen(true);
      setErrorModalMessage(profileError.message);
      return;
    }

    setFormData({
      email: '',
      nickname: '',
      password: '',
    });

    setErrorMessage({
      email: '',
      nickname: '',
      password: '',
    });

    navigate('/landing');
  };

  const isFormValid =
    errorMessage.email === 'Valid' &&
    errorMessage.password === 'Valid' &&
    errorMessage.nickname === 'Valid' &&
    formData.email &&
    formData.password &&
    formData.nickname;

  return (
    <>
      <section>
        <div className='p-[4rem] text-center border  border-gray-D '>
          <h1 className="text-32 mb-[3rem] font-['KimjungchulMyungjo-Bold']">
            T vvith M
          </h1>
          <div className=' border-b border-gray-D mb-[2rem]'>
            <button className='w-full rounded  text-white bg-orange-2 p-[.5rem] mb-[2rem]'>
              카카오로 로그인
            </button>
          </div>
          <form
            className='flex flex-col text w-[30rem]'
            onSubmit={handleSubmit}
          >
            <AuthInput
              type='text'
              name='email'
              value={formData.email}
              placeholder='사용자 이름 또는 이메일'
              errorMessage={errorMessage.email}
              onChange={handleInputChange}
            />
            <div className='mt-[1rem]'>
              <AuthInput
                type='text'
                name='nickname'
                value={formData.nickname}
                placeholder='닉네임'
                errorMessage={errorMessage.nickname}
                onChange={handleInputChange}
              />
            </div>
            <div className='mt-[1rem]'>
              <AuthInput
                type={isShow ? 'text' : 'password'}
                name='password'
                value={formData.password}
                placeholder='비밀번호'
                errorMessage={errorMessage.password}
                onChange={handleInputChange}
                togglePasswordVisibility={toggleShowPassword}
                isPasswordVisible={isShow}
              />
            </div>
            <button
              type='submit'
              disabled={!isFormValid}
              className={`w-full rounded mt-[2rem] text-white p-[.5rem] ${isFormValid ? 'bg-orange-2' : 'bg-gray-D'}`}
            >
              가입
            </button>
          </form>
        </div>
        <div className='px-[4rem] py-[2rem] border border-gray-D mt-[2rem] text-center '>
          <p>
            계정이 있으신가요?
            <Link to='/signin' className='text-orange-2 ml-[1rem]'>
              로그인
            </Link>
          </p>
        </div>
      </section>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>{errorModalMessage}</Modal>
      )}
    </>
  );
}

export default SignupForm;
