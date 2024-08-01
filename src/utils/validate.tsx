export const getEmailValidationMessage = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //둘중 하나라도 true 이면 invalid를 반환
  if (email === '' || !emailRegex.test(email)) {
    return 'Invalid';
  }
  return 'Valid';
};

export const getPasswordValidationMessage = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  if (password === '' || !passwordRegex.test(password)) {
    return 'Invalid';
  }
  return 'Valid';
};
