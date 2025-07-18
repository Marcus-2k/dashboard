import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class Pagination {
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageSize: number = 10;
}
