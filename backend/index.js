import * as dotenv from "dotenv";
import Fastify from "fastify";

dotenv.config();

import { minioRoutes } from "./routes/minio.js";

const app = Fastify({
  logger: true,
});

// Disable CORS completely
app.addHook("onRequest", async (request, reply) => {
  // Remove any CORS headers that might be set
  reply.header("Access-Control-Allow-Origin", "*");
});

// Routes
app.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

await minioRoutes(app);
// Routes

try {
  await app.listen({ port: 5000 });

  console.log("Server is running on port 5000");
} catch (err) {
  app.log.error(err);

  process.exit(1);
}
