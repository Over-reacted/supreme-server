import { Controller, Get, Param, Post, Patch, Delete, Query, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'modules/auth/get-user.decorator';
import { IProfile } from 'modules/profile/profile.model';

@Controller('basket')
@UseGuards(AuthGuard("jwt"))
export class BasketController {
    constructor(private basketService: BasketService,){}

    @Get()
    async getBasket(@GetUser() user){
        return await this.basketService.getBasket(user);
    }

    @Post('/:productId')
    async addToBasket(@Param('productId') productId: string, @GetUser() user: IProfile): Promise<void>{
        return await this.basketService.addToBasket(productId, user);
    }

    @Delete('/:productId')
    async removeFromBasket(@Param('productId') productId: string, @GetUser() user: IProfile): Promise<void>{
        return await this.basketService.removeFromBasket(productId, user);
    }

    @Patch('/:productId/increase')
    async increaseItemQuantity(@Param('productId') productId: string, @GetUser() user: IProfile): Promise<void>{
        return await this.basketService.increaseItemQuantity(productId, user);
    }

    @Patch('/:productId/decrease')
    async decreaseItemQuantity(@Param('productId') productId: string, @GetUser() user: IProfile): Promise<void>{
        return await this.basketService.decreaseItemQuantity(productId, user);
    }

    @Patch('/:productId')
    async setItemQuantity(
        @Query('quantity',ParseIntPipe) quantity: number, 
        @Param('productId') productId: string, 
        @GetUser() user: IProfile): Promise<void>{
        return await this.basketService.setItemQuantity(quantity, productId, user);
    }
}
