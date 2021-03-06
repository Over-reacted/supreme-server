import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
} from "class-validator";

/**
 * Register Payload Class
 */
export class RegisterPayload {
  /**
   * Email field
   */
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * First name field
   */
  @ApiProperty({
    required: true,
  })
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  firstName: string;

  /**
  * Last name field
  */
  @ApiProperty({
    required: true,
  })
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  lastName: string;

  /**
   * Password field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
