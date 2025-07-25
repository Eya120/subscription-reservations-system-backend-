import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('protected')
export class ProtectedController {
  @Get()
  getProtectedResource(@Req() req: Request) {
    return {
      message: 'Accès autorisé',
      user: req['user'],
    };
  }
}
