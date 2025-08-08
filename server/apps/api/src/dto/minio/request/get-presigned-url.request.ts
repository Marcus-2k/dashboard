import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetPresignedUrlRequest {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  bucket: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  key: string;
}
