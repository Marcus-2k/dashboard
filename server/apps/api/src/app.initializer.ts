import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function initApi(app: NestExpressApplication): void {
  app.enableCors();

  app.setGlobalPrefix("api");

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}

export function initDocs(app: NestExpressApplication): void {
  if (process.env.NODE_ENV === "prod") {
    return;
  }

  const DOCS_UI_PATH = "docs";
  const JSON_PATH = "../docs-json";
  const YAML_PATH = "../docs-yaml";

  const documentationBuilder = new DocumentBuilder();
  const options = documentationBuilder
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "Login",
    })
    .addServer("http://localhost:3000", "Local")
    .setDescription("API documentation")
    .setVersion(process.env.VERSION || "1.0.0")
    .setTitle("API")
    .setExternalDoc("Postman Collection", `${JSON_PATH}`)
    .setExternalDoc("YAML", `${YAML_PATH}`)
    .build();

  const swaggerDocumentation = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(DOCS_UI_PATH, app, swaggerDocumentation);
}
