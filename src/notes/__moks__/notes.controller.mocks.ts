export const NotesMoksController = {
  createNote: jest.fn(),
  findAllNotes: jest.fn(),
  findOneNote: jest.fn(),
  updateNote: jest.fn(),
  removeNote: jest.fn(),
};

export const NoteMockDto = {
  title: 'Título teste',
  description: 'Descrição teste',
};
