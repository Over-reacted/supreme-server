import * as crypto from "crypto";
import * as gravatar from "gravatar";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IProfile } from "./profile.model";
import { RegisterPayload } from "modules/auth/payload/register.payload";
import { AppRoles } from "../app/app.roles";
import { PatchProfilePayload } from "./payload/patch.profile.payload";
import { IWishlist } from "modules/wishlist/wishlist.model";
import { IBasket } from "modules/basket/basket.model";

/**
 * Models a typical response for a crud operation
 */
export interface IGenericMessageBody {
  /**
   * Status message to return
   */
  message: string;
}

/**
 * Profile Service
 */
@Injectable()
export class ProfileService {
  /**
   * Constructor
   * @param {Model<IProfile>} profileModel
   */
  constructor(
    @InjectModel("Profile") private readonly profileModel: Model<IProfile>,
    @InjectModel("Wishlist") private readonly wishlistModel: Model<IWishlist>,
    @InjectModel("Basket") private readonly basketModel: Model<IBasket>,
  ) {}

  /**
   * Fetches a profile from database by UUID
   * @param {string} id
   * @returns {Promise<IProfile>} queried profile data
   */
  get(id: string): Promise<IProfile> {
    return this.profileModel.findById(id).exec();
  }

  /**
   * Fetches a profile from database by email
   * @param {string} email
   * @returns {Promise<IProfile>} queried profile data
   */
  getByEmail(email: string): Promise<IProfile> {
    return this.profileModel.findOne({ email }).exec();
  }

  /**
   * Fetches a profile by their email and hashed password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<IProfile>} queried profile data
   */
  getByEmailAndPass(email: string, password: string): Promise<IProfile> {
    return this.profileModel
      .findOne({
        email,
        password: crypto.createHmac("sha256", password).digest("hex"),
      })
      .exec();
  }

  /**
   * Create a profile with RegisterPayload fields
   * @param {RegisterPayload} payload profile payload
   * @returns {Promise<IProfile>} created profile data
   */
  async create(payload: RegisterPayload): Promise<IProfile> {
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new NotAcceptableException(
        "The account with the provided email currently exists. Please choose another one.",
      );
    }

    let wishlist = new this.wishlistModel();
    let basket = new this.basketModel();

    // this will auto assign the admin role to each created user
    const createdProfile = new this.profileModel({
      ...payload,
      password: crypto.createHmac("sha256", payload.password).digest("hex"),
      wishlistId: wishlist._id,
      basketId: basket._id,
    });

    wishlist.userId = createdProfile._id;
    wishlist.save();
    basket.userId = createdProfile._id;
    basket.save();

    return createdProfile.save();
  }

  /**
   * Edit profile data
   * @param {PatchProfilePayload} payload
   * @returns {Promise<IProfile>} mutated profile data
   */
  async edit(payload: PatchProfilePayload): Promise<IProfile> {
    const { email } = payload;
    const updatedProfile = await this.profileModel.updateOne(
      { email },
      payload,
    );
    if (updatedProfile.nModified !== 1) {
      throw new BadRequestException(
        "The profile with that email does not exist in the system. Please try another email.",
      );
    }
    return this.getByEmail(email);
  }

  /**
   * Delete profile given an email
   * @param {string} email
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(email: string): Promise<IGenericMessageBody> {
    return this.profileModel.deleteOne({ email }).then(profile => {
      if (profile.deletedCount === 1) {
        return { message: `Deleted ${email} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a profile by the email of ${email}.`,
        );
      }
    });
  }
}
