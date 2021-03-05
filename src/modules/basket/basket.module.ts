import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { BasketRepository } from './basket.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from 'modules/products/product.model';
import { Basket } from './basket.model';

@Module({
  imports: 
  [
    MongooseModule.forFeature([{ name: "Basket", schema: Basket }]),
  ],
  controllers: [BasketController],
  providers: [BasketRepository, BasketService]
})
export class BasketModule {}
