import { ApiProperty } from "@nestjs/swagger";

export class HealthCheckResponse {
  @ApiProperty({ type: Boolean })
  ok: boolean;

  constructor(isHealthy: boolean) {
    this.ok = isHealthy;
  }
}
