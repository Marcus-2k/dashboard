import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class UpdateProductRequest {
  @ApiProperty({ type: String, isArray: true })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  images?: string[];

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(1)
  @IsOptional()
  price?: number;

  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  @IsOptional()
  discountPrice?: number | null;
}
