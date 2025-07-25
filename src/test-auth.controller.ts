// src/test-auth.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller('test-auth')
export class TestAuthController {
 
  @Get()
  test(@Req() req) {
    console.log('🔥 Utilisateur Firebase :', req.user);
    return {
      message: 'Utilisateur authentifié',
      uid: req.user?.uid,
      email: req.user?.email,
    };
  }
}
