import { HealthCheckResponse } from "@dto/general";
import { Controller, Get } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Health check")
@Controller("health")
export default class HealthCheckController {
  @Get()
  @ApiResponse({ type: HealthCheckResponse })
  @ApiInternalServerErrorResponse({ description: "Internal error" })
  isHealthy(): { data: HealthCheckResponse } {
    return { data: new HealthCheckResponse(true) };
  }
}
