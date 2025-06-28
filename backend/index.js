import * as dotenv from "dotenv";
import Fastify from "fastify";

dotenv.config();

import { minioRoutes } from "./routes/minio.js";

const app = Fastify({
  logger: true,
});

// Services
// new MinioService();
// Services

// Routes
app.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

await minioRoutes(app);
// Routes

try {
  await app.listen({ port: 5000 });
} catch (err) {
  app.log.error(err);

  process.exit(1);
}
