import { Controller, Get, Param, Post } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
    constructor(private basketService: BasketService,){}

    @Get()
    async getBasket(){
        return await this.basketService.getBasket();
    }

    @Post('/:productId')
    async addToBasket(@Param('productId') productId: string){
        return await this.basketService.addToBasket(productId);
    }
}
