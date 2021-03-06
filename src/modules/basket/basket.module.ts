import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { BasketRepository } from './basket.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Basket, Item } from './basket.model';
import { ProductsRepository } from 'modules/products/products.repository';
import { Product } from 'modules/products/product.model';

@Module({
  imports: 
  [
    MongooseModule.forFeature([{ name: "Basket", schema: Basket }]),
    MongooseModule.forFeature([{ name: "Item", schema: Item }]),
    MongooseModule.forFeature([{ name: "Product", schema: Product }]),
  ],
  controllers: [BasketController],
  providers: [ProductsRepository, BasketRepository, BasketService]
})
export class BasketModule {}
