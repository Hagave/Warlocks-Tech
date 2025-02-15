export const NotesMocksService = {
  notes: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

export const NoteMockDto = {
  title: 'Título teste',
  description: 'Descrição teste',
};
