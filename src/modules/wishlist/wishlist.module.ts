import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';

@Module({
  controllers: [WishlistController],
  providers: [WishlistRepository,WishlistService]
})
export class WishlistModule {}
