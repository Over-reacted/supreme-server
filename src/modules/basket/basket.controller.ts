import { Controller, Get, Param, Post, Patch, Delete, Query, ParseIntPipe } from '@nestjs/common';
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

    @Patch('/:productId')
    async setItemQuantity(@Query('quantity',ParseIntPipe) quantity: number, @Param('productId') productId: string){
        return await this.basketService.setItemQuantity(quantity, productId);
    }
}
