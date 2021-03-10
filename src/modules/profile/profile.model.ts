import { Schema, Document } from "mongoose";
import { AppRoles } from "modules/app/app.roles";
import { Wishlist, IWishlist } from "modules/wishlist/wishlist.model";
import { Basket, IBasket } from "modules/basket/basket.model";

/**
 * Mongoose Profile Schema
 */
export const Profile = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, required: false }],
  date: {
    type: Date,
    default: Date.now,
  },
  wishlistId: { type: Schema.Types.ObjectId, required: true },
  basketId: { type: Schema.Types.ObjectId, required: true },
});

/**
 * Mongoose Profile Document
 */
export interface IProfile extends Document {
  /**
   * UUID
   */
  readonly _id: Schema.Types.ObjectId;

  wishlistId: Schema.Types.ObjectId;

  basketId: Schema.Types.ObjectId;

  /**
   * Email
   */
  readonly email: string;
  /**
   * First name
   */
  readonly firstName: string;
    /**
   * Last name
   */
  readonly lastName: string;
  /**
   * Password
   */
  password: string;
  /**
   * Roles
   */
  readonly roles: AppRoles;
  /**
   * Date
   */
  readonly date: Date;

  wishlist: IWishlist;

  basket: IBasket;
}
