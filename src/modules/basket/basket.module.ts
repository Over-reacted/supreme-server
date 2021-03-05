import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { BasketRepository } from './basket.repository';

@Module({
  controllers: [BasketController],
  providers: [BasketRepository, BasketService]
})
export class BasketModule {}
