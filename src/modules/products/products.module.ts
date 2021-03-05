import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './product.model';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Product", schema: Product }])],
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService]
})
export class ProductsModule {}
