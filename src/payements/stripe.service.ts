import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // Pas besoin de préciser apiVersion si cela cause des erreurs
    });
  }

  /**
   * Crée un PaymentIntent Stripe
   * @param amount Montant en centimes (ex: 1000 = 10.00 EUR)
   * @param currency Devise, ex: 'eur'
   * @param metadata Optionnel, données supplémentaires
   */
  async createPaymentIntent(
    amount: number,
    currency = 'eur',
    metadata?: Record<string, string>,
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        metadata,
        // Optionnel : pour gérer le paiement par carte
        payment_method_types: ['card'],
      });
      return paymentIntent;
    } catch (error) {
      throw new InternalServerErrorException(
        `Stripe createPaymentIntent error: ${error.message}`,
      );
    }
  }

  /**
   * Récupère un PaymentIntent par son ID
   */
  async retrievePaymentIntent(id: string): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.retrieve(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Stripe retrievePaymentIntent error: ${error.message}`,
      );
    }
  }
}
