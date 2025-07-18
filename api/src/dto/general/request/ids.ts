import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class IdsDto {
  @ApiProperty({ type: String, isArray: true })
  @IsUUID(4, { each: true })
  ids: string[];
}
