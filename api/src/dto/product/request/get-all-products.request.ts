import { PaginationRequest } from "@dto/general";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetAllProductsRequest extends PaginationRequest {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search: string | null = null;
}
