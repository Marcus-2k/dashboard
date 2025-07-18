import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class IdDto {
  @ApiProperty({ type: String })
  @IsUUID(4)
  id: string;
}
