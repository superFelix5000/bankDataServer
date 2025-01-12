import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { fetchCategoryMap, saveCategoryMap } from "../controllers/dataEntries.ts";
import { Category, RecipientCategory } from "../src/types.ts";
import config from "../src/config.ts";
import { mockFileSystem, restoreFileSystem, createMockContext } from "./setup.ts";

const { fileNameCategoryMap } = config;

Deno.test("fetchCategoryMap", async () => {
  const mockCategories: RecipientCategory[] = [
    { recipient: "Test Recipient", category: Category.FOOD },
  ];
  
  mockFileSystem({
    [fileNameCategoryMap]: JSON.stringify(mockCategories),
  });

  const ctx = createMockContext();

  await fetchCategoryMap(ctx);

  assertEquals(ctx.response.status, 200);
  assertEquals(ctx.response.body, {
    success: true,
    data: mockCategories,
  });

  restoreFileSystem();
});

Deno.test("saveCategoryMap - valid input", async () => {
  const mockCategories: RecipientCategory[] = [
    { recipient: "Test Recipient", category: Category.FOOD },
  ];

  mockFileSystem({});

  const ctx = createMockContext(mockCategories);

  await saveCategoryMap(ctx);

  assertEquals(ctx.response.status, 201);
  assertEquals(ctx.response.body, { success: true });

  restoreFileSystem();
});

Deno.test("saveCategoryMap - invalid input", async () => {
  const invalidCategories = [
    { recipient: "Test Recipient", category: "INVALID_CATEGORY" },
  ];

  mockFileSystem({});

  const ctx = createMockContext(invalidCategories);

  await saveCategoryMap(ctx);

  assertEquals(ctx.response.status, 400);
  assertEquals(ctx.response.body.success, false);
  assertEquals(ctx.response.body.message, "Invalid input data");

  restoreFileSystem();
});
