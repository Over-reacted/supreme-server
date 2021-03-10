import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Profile } from "./profile.model";
import { ProfileController } from "./profile.controller";
import { Wishlist } from "modules/wishlist/wishlist.model";
import { Basket } from "modules/basket/basket.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Profile", schema: Profile }]),
    MongooseModule.forFeature([{ name: "Wishlist", schema: Wishlist }]),
    MongooseModule.forFeature([{ name: "Basket", schema: Basket }]),
  ],
  providers: [ProfileService],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
