/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes.service';
import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  NoteMockDto,
  NotesMocksService,
} from '../__moks__/notes.service.mocks';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: PrismaService,
          useValue: NotesMocksService,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um post vinculado ao usuario', async () => {
    NotesMocksService.notes.create.mockReturnValue({
      noteId: 1,
      title: 'Título teste',
      description: 'Descrição teste',
      userId: 2,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    const userId = 2;
    const result = await service.createNote(NoteMockDto, userId);

    expect(result).toEqual({
      success: true,
      message: 'Nota criada com sucesso!',
      status: HttpStatus.CREATED,
      createNote: {
        noteId: 1,
        title: 'Título teste',
        description: 'Descrição teste',
        userId: 2,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    });
  });

  it('deve retornar todas as notas do usuario', async () => {
    NotesMocksService.notes.findMany.mockResolvedValue([
      {
        noteId: 4,
        title: 'Primeira nota',
        description: 'Descricao 1',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        noteId: 5,
        title: 'Primeira nota',
        description: 'Descricao 1',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const userId = 4;
    const result = await service.findAllNotes(userId);

    expect(result).toEqual({
      success: true,
      message: 'Nota encontrada com sucesso!',
      status: 201,
      findAllUserNotes: [
        {
          noteId: 4,
          title: 'Primeira nota',
          description: 'Descricao 1',
          userId: 4,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          noteId: 5,
          title: 'Primeira nota',
          description: 'Descricao 1',
          userId: 4,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ],
    });
  });

  it('deve retornar uma nota pelo id', async () => {
    // Configurando o mock do Prisma corretamente
    NotesMocksService.notes.findFirst.mockResolvedValue({
      noteId: 1,
      title: 'titulo 1',
      description: 'descricao 1',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const noteId = 1;
    const userId = 1;
    const result = await service.findOneNote(noteId, userId);

    expect(result).toEqual({
      success: true,
      message: 'Nota encontrada com sucesso!',
      status: HttpStatus.OK,
      findUniqueNote: {
        noteId: 1,
        title: 'titulo 1',
        description: 'descricao 1',
        userId: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    });
  });
  it('deve atualizar uma nota existente', async () => {
    NotesMocksService.notes.update.mockResolvedValue({
      noteId: 1,
      title: 'Primeiro titulo',
      description: 'Descricao qualquer',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const noteId = 1;
    const userId = 2;
    const result = await service.updateNote(noteId, userId, NoteMockDto);

    expect(result).toEqual({
      success: true,
      message: 'Nota atualizada com sucesso!',
      status: HttpStatus.OK,
      updateUserNote: {
        noteId: 1,
        title: 'Primeiro titulo',
        description: 'Descricao qualquer',
        userId: 2,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    });
  });

  it('deve deletar uma nota do usuario', async () => {
    NotesMocksService.notes.findFirst.mockResolvedValue({
      noteId: 1,
      title: 'Primeiro titulo',
      description: 'Descricao qualquer',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    NotesMocksService.notes.delete.mockResolvedValue({
      noteId: 1,
      title: 'Primeiro titulo',
      description: 'Descricao qualquer',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const noteId = 1;
    const userId = 2;

    const result = await service.removeNote(noteId, userId);

    expect(result).toEqual({
      success: true,
      message: 'Nota deletada com sucesso!',
      status: HttpStatus.OK,
      userNote: {
        noteId: 1,
        title: 'Primeiro titulo',
        description: 'Descricao qualquer',
        userId: 2,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    });
  });
});
