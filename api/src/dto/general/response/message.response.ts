import { ApiProperty } from "@nestjs/swagger";

export class MessageResponse {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Boolean })
  success: boolean;
}
