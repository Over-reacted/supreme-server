import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
  Matches,
} from "class-validator";

/**
 * Patch Profile Payload Class
 */
export class PatchProfilePayload {
  /**
   * Email field
   */
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * First name field
   */
  @ApiProperty()
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  firstName: string;

  /**
   * Last name field
   */
  @ApiProperty()
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  lastName: string;

  /**
   * Password field
   */
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
