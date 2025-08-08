import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponse {
  @ApiProperty({ type: Object, isArray: true })
  items: any[];

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  totalPages: number;
}
