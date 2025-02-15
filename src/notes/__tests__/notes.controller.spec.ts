import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from '../notes.controller';
import { NotesService } from '../notes.service';
import {
  NoteMockDto,
  NotesMoksController,
} from '../__moks__/notes.controller.mocks';
import { JwtService } from '@nestjs/jwt';
import { JWTController } from '../../users/__moks__/user.controller.mock';

describe('NotesController', () => {
  let controller: NotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: NotesMoksController,
        },
        {
          provide: JwtService,
          useValue: JWTController,
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar a noteService.createUser com os dados corretos', async () => {
    const serviceSpy = jest
      .spyOn(NotesMoksController, 'createNote')
      .mockReturnValue(undefined);

    const userId = { user: { sub: 1 } };
    await controller.create(NoteMockDto, userId);

    expect(serviceSpy).toHaveBeenCalledWith(NoteMockDto, 1);
  });

  it('deve chamar a noteService.findAll com os dados corretos', async () => {
    const serviceSpy = jest
      .spyOn(NotesMoksController, 'findAllNotes')
      .mockResolvedValue(undefined);

    const userId = { user: { sub: 1 } };

    await controller.findAll(userId);

    expect(serviceSpy).toHaveBeenCalledWith(1);
  });

  it('deve chamar a noteService.findOne com os dados corretos', async () => {
    const serviceSpy = jest
      .spyOn(NotesMoksController, 'findOneNote')
      .mockResolvedValue(undefined);

    const userId = { user: { sub: 1 } };
    const noteId = '2';

    await controller.findOne(noteId, userId);
    expect(serviceSpy).toHaveBeenCalledWith(2, 1);
  });

  it('deve chamar a noteService.update com os dados corretos', async () => {
    const serviceSpy = jest
      .spyOn(NotesMoksController, 'updateNote')
      .mockResolvedValue(undefined);
    const userId = { user: { sub: 1 } };
    const noteId = '2';
    await controller.update(noteId, userId, NoteMockDto);

    expect(serviceSpy).toHaveBeenCalledWith(2, 1, NoteMockDto);
  });

  it('deve chamar a noteservice.delete com os dados corretos', async () => {
    const serviceSpy = jest
      .spyOn(NotesMoksController, 'removeNote')
      .mockResolvedValue(undefined);

    const userId = { user: { sub: 1 } };
    const noteId = '2';

    await controller.remove(noteId, userId);
    expect(serviceSpy).toHaveBeenCalledWith(2, 1);
  });
});
