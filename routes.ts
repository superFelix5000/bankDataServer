import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  fetchAllDataEntries,
  saveAllDataEntries,
} from "./controllers/dataEntries.ts";

const router = new Router();

router.get("/api/v1/fetchAll", fetchAllDataEntries)
  .get("/", (ctx) => {
    ctx.response.body = "PUP a GET HTTP method";
  }).post("/api/v1/saveAll", saveAllDataEntries);

// .put('api/v1/:id', updateDataEntry);

export default router;
