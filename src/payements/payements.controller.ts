import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PaiementsService } from './payements.service';
import { CreatePaiementDto } from './dto/create-payement.dto';
import { UpdatePaiementDto } from './dto/update-payement.dto';
import { StripeService } from './stripe.service';

@Controller('payements')
export class PaymentsController {
  constructor(
    private readonly paiementsService: PaiementsService,
    private readonly stripeService: StripeService,
  ) {}

  // ✅ Crée un PaymentIntent Stripe et retourne le client_secret
  @Post('create')
  async create(@Body() body: { amount: number }) {
    const paymentIntent = await this.stripeService.createPaymentIntent(body.amount);
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  // ✅ Crée un enregistrement en base (ex: après confirmation du paiement côté frontend)
  @Post()
  createPaiement(@Body() createPaiementDto: CreatePaiementDto) {
    return this.paiementsService.create(createPaiementDto);
  }

  @Get()
  findAll() {
    return this.paiementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paiementsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePaiementDto) {
    return this.paiementsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paiementsService.remove(id);
  }
}
