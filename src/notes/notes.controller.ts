/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiTags('Notes')
  @ApiOperation({
    description: 'O `userId` é extraído do JWT do usuário.',
  })
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return this.notesService.createNote(createNoteDto, +userId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    description:
      'Encontre todas as notas do usuário. O `userId` é extraído do JWT do usuário.',
  })
  @Get()
  findAll(@Req() req: any) {
    const userId = req.user.sub;
    return this.notesService.findAllNotes(+userId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    description: ' O `userId` é extraído do JWT do usuário.',
  })
  @Get('find_note/:noteId')
  findOne(@Param('noteId') noteId: string, @Req() req) {
    const userId = req.user.sub;

    return this.notesService.findOneNote(+noteId, +userId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    description: ' O `userId` é extraído do JWT do usuário.',
  })
  @Patch('update_note/:noteId')
  update(
    @Param('noteId') noteId: string,
    @Req() req: any,
    @Body(new ValidationPipe()) updateNoteDto: UpdateNoteDto,
  ) {
    const userId = req.user.sub;
    return this.notesService.updateNote(+noteId, +userId, updateNoteDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    description: ' O `userId` é extraído do JWT do usuário.',
  })
  @Delete('delete_note/:noteId')
  remove(@Param('noteId') noteId: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.notesService.removeNote(+noteId, +userId);
  }
}
