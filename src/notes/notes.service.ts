/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async createNote(createNoteDto: CreateNoteDto, userId: number) {
    try {
      const createNote = await this.prisma.notes.create({
        data: {
          description: createNoteDto.description,
          title: createNoteDto.title,
          userId: userId,
        },
      });

      return {
        success: true,
        message: 'Nota criada com sucesso!',
        status: HttpStatus.CREATED,
        createNote,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao criar nota!',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      };
    }
  }

  async findAllNotes(userId: number) {
    try {
      const userNotes = await this.prisma.notes.findMany({
        where: { userId: userId },
      });
      return {
        success: true,
        message: 'Nota encontrada com sucesso!',
        status: HttpStatus.CREATED,
        userNotes,
      };
    } catch (error) {
      return {
        success: true,
        message: 'Nao foi possivel buscar notas criadas pelo usuario!',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      };
    }
  }

  async findOneNote(noteId: number, userId: number) {
    try {
      const findUniqueNote = await this.prisma.notes.findFirst({
        where: { noteId, userId },
      });

      if (!findUniqueNote) {
        return {
          success: false,
          message:
            'Nota não encontrada ou você não tem permissão para visualizá-la.',
          status: HttpStatus.NOT_FOUND,
        };
      }

      return {
        success: true,
        message: 'Nota encontrada com sucesso!',
        status: HttpStatus.OK,
        findUniqueNote,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao buscar essa nota.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      };
    }
  }

  async updateNote(
    noteId: number,
    userId: number,
    updateNoteDto: UpdateNoteDto,
  ) {
    try {
      const updateUserNote = await this.prisma.notes.update({
        where: { noteId, userId },
        data: updateNoteDto,
      });

      return {
        success: true,
        message: 'Nota atualizada com sucesso!',
        status: HttpStatus.OK,
        updateUserNote,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao atualizar a nota.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      };
    }
  }

  async removeNote(noteId: number, userId: number) {
    try {
      const userNote = await this.prisma.notes.delete({
        where: { noteId, userId },
      });

      if (!userNote) {
        return {
          success: false,
          message: 'Erro ao buscar essa nota.',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        success: true,
        message: 'Nota deletada com sucesso!',
        status: HttpStatus.OK,
        userNote,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao deletar a nota.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      };
    }
  }
}
