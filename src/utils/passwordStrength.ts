const calculatePasswordStrength = (password: string) => {
  let strength = 0;

  if (/[A-ZА-ЯЁ]/.test(password)) {
    strength += 1;
  }
  if (/[a-zа-яё]/.test(password)) {
    strength += 1;
  }
  if (/\d/.test(password)) {
    strength += 1;
  }
  if (/[^A-ZА-Яa-zа-я0-9Ёё\s]/.test(password)) {
    strength += 1;
  }

  return strength;
};

export default calculatePasswordStrength;
