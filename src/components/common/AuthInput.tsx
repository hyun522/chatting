import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

interface AuthInputProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //prop은 선택적이다 , 함수가 인수를 받지 않으며, 반환 값도 없음
  togglePasswordVisibility?: () => void;
  //prop은 선택적이다 , boolean 타입의 props
  isPasswordVisible?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  type,
  name,
  value,
  placeholder,
  errorMessage,
  onChange,
  togglePasswordVisibility,
  isPasswordVisible,
}) => {
  return (
    <div className='relative'>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='w-full bg-gray-E p-[1rem] border border-gray-D focus:outline-none focus:border-gray-9'
      />
      <span
        className={`absolute top-1/2 -translate-y-1/2 ${type === 'password' ? 'right-[3rem]' : 'right-[1rem]'} `}
      >
        {errorMessage === 'Invalid' && <FaTimesCircle color='red' />}
        {errorMessage === 'Valid' && <FaCheckCircle color='green' />}
      </span>
      {type === 'password' && togglePasswordVisibility && (
        <span
          onClick={togglePasswordVisibility}
          className='absolute top-1/2 -translate-y-1/2 right-[1rem] cursor-pointer'
        >
          {isPasswordVisible ? (
            <FaEyeSlash color='#ECB05C' size={16} />
          ) : (
            <IoEyeSharp color='#ECB05C' size={16} />
          )}
        </span>
      )}
    </div>
  );
};

export default AuthInput;
