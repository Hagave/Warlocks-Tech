export const UserControllerMocks = {
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

export const UserDto = {
  name: 'Teste',
  email: 'teste@teste.com',
  password: 'largepassword',
};

export const JWTController = {
  sign: jest.fn().mockReturnValue('mocked-token'),
  verify: jest.fn().mockReturnValue({ userId: 1 }),
};
