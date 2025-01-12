import { Application, isHttpError } from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import router from "./routes.ts";
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";

const port = parseInt(Deno.env.get("PORT") || "8000");
const corsOrigin = Deno.env.get("CORS_ORIGIN") || "http://localhost:4200";

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: unknown) {
    if (isHttpError(err)) {
      ctx.response.status = err.status;
    } else {
      ctx.response.status = 500;
    }
    ctx.response.body = { message: err instanceof Error ? err.message : "An unknown error occurred" };
    ctx.response.headers.set("Content-Type", "application/json");
  }
});

app.use(
  oakCors({
    origin: corsOrigin,
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

app.use(logger.logger);
app.use(logger.responseTime);

console.log(`Server running on port ${port}`);

await app.listen({ port });
