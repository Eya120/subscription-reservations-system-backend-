// src/test-auth.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase/firebase-auth.guard'; // adapte le chemin

@Controller('test-auth')
export class TestAuthController {
  @UseGuards(FirebaseAuthGuard)
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
