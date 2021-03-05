import { Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
    constructor(private basketService: BasketService,){}

    @Get()
    async getBasket(){
        return await this.basketService.getBasket();
    }

    @Post('/:productId')
    async addToBasket(@Param('productId') productId: string): Promise<void>{
        return await this.basketService.addToBasket(productId);
    }

    @Delete('/:productId')
    async removeFromBasket(@Param('productId') productId: string): Promise<void>{
        return await this.basketService.removeFromBasket(productId);
    }

    @Patch('/:productId/increase')
    async increaseItemQuantity(@Param('productId') productId: string): Promise<void>{
        return await this.basketService.increaseItemQuantity(productId);
    }

    @Patch('/:productId/decrease')
    async decreaseItemQuantity(@Param('productId') productId: string): Promise<void>{
        return await this.basketService.decreaseItemQuantity(productId);
    }
}
