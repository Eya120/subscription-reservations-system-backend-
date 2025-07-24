import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Request } from 'express';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(FirebaseAuthGuard)
  getProtectedResource(@Req() req: Request) {
    return {
      message: 'Accès autorisé',
      user: req['user'],
    };
  }
}
