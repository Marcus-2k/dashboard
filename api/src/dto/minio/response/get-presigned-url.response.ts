import { ApiProperty } from "@nestjs/swagger";

export class GetPresignedUrlResponse {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  presignedUrl: string;

  @ApiProperty({ type: String })
  previewUrl: string;
}
