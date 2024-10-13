import { Application } from "https://deno.land/x/oak@v17.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import router from "./routes.ts";

const port = 8000;

const app = new Application();

app.use(
  oakCors({
    origin: "http://localhost:4200",
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);

await app.listen({ port });
