export const UserServiceMoks = {
  findUnique: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
export const NotesMock = {
  deleteMany: jest.fn(),
};

export const UserDto = {
  name: 'Teste',
  email: 'teste@teste.com',
  password: 'largepassword',
};
