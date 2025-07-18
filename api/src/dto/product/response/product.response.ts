import { ApiProperty } from "@nestjs/swagger";

export class ProductResponse {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, isArray: true })
  images: string[];

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Number, nullable: true })
  discountPrice: number | null;

  @ApiProperty({ type: Date })
  createdAtUtc: Date;

  @ApiProperty({ type: Date })
  updatedAtUtc: Date;
}
