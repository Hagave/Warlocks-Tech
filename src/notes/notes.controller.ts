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

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

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
  @Get()
  findAll(@Req() req: any) {
    const userId = req.user.sub;
    return this.notesService.findAllNotes(+userId);
  }

  @UseGuards(AuthGuard)
  @Get('find_note/:noteId')
  findOne(@Param('noteId') noteId: string, @Req() req) {
    const userId = req.user.sub;

    return this.notesService.findOneNote(+noteId, +userId);
  }

  @UseGuards(AuthGuard)
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
  @Delete('delete_note/:noteId')
  remove(@Param('noteId') noteId: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.notesService.removeNote(+noteId, +userId);
  }
}
