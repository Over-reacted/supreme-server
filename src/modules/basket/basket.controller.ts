import { Controller, Get, Param, Post, Patch, Delete, Query, ParseIntPipe, UseGuards, Req, ParseUUIDPipe } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'modules/auth/get-user-id.decorator';
import { IProfile } from 'modules/profile/profile.model';

@Controller('basket')
@UseGuards(AuthGuard("jwt"))
export class BasketController {
    constructor(private basketService: BasketService,){}

    @Get()
    async getBasket(@GetUserId() userId){
        return await this.basketService.getBasket(userId);
    }

    @Post('/:productId')
    async addToBasket(@Param('productId') productId: string, @GetUserId() userId): Promise<void>{
        return await this.basketService.addToBasket(productId, userId);
    }

    @Delete('/:productId')
    async removeFromBasket(@Param('productId') productId: string, @GetUserId() userId: string): Promise<void>{
        return await this.basketService.removeFromBasket(productId, userId);
    }

    @Patch('/:productId/increase')
    async increaseItemQuantity(@Param('productId') productId: string, @GetUserId() userId: string): Promise<void>{
        return await this.basketService.increaseItemQuantity(productId, userId);
    }

    @Patch('/:productId/decrease')
    async decreaseItemQuantity(@Param('productId') productId: string, @GetUserId() userId: string): Promise<void>{
        return await this.basketService.decreaseItemQuantity(productId, userId);
    }

    @Patch('/:productId')
    async setItemQuantity(
        @Query('quantity',ParseIntPipe) quantity: number, 
        @Param('productId') productId: string, 
        @GetUserId() userId: string): Promise<void>{
        return await this.basketService.setItemQuantity(quantity, productId, userId);
    }
}
