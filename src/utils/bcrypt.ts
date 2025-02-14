import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword);
};
