import { Controller, Get } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
    constructor(private basketService: BasketService,){}

    @Get()
    async getBasket(){
        return await this.basketService.getBasket();
    }
}
