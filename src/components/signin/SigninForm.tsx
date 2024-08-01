import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getEmailValidationMessage,
  getPasswordValidationMessage,
} from '@/utils/validate';
import AuthInput from '@/components/AuthInput';

interface formDataType {
  email: string;
  password: string;
}

function SigninForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<formDataType>({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<formDataType>({
    email: '',
    password: '',
  });

  const [isShow, setIsShow] = useState<boolean>(false);

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
  };

  const toggleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      errorMessage.email !== 'Valid' ||
      errorMessage.password !== 'Valid' ||
      !formData.email ||
      !formData.password
    )
      return;

    navigate('/');
  };

  const isFormValid =
    errorMessage.email === 'Valid' &&
    errorMessage.password === 'Valid' &&
    formData.email &&
    formData.password;

  return (
    <>
      <section>
        <div className='p-[4rem] text-center border border-gray-D '>
          <h1 className="text-32 mb-[3rem] font-['KimjungchulMyungjo-Bold']">
            T vvith M
          </h1>
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
              className={`w-full rounded mt-[2rem] text-white bg-orange-2 p-[.5rem] ${isFormValid ? '' : 'bg-gray-D'}`}
            >
              로그인
            </button>
          </form>
        </div>
        <div className='px-[4rem] py-[2rem] border border-gray-D mt-[2rem] text-center '>
          <p>
            계정이 없으신가요?
            <Link to='/signup' className='text-orange-2 ml-[1rem]'>
              가입하기
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default SigninForm;
