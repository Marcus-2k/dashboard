import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Pagination } from "src/shared/class/pagination";

export class GetAllProductsRequest extends Pagination {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search: string | null = null;
}
