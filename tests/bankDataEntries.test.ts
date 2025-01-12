import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { fetchAllDataEntries, saveAllDataEntries, appendAllDataEntries } from "../controllers/dataEntries.ts";
import { Category, BankDataEntry } from "../src/types.ts";
import config from "../src/config.ts";
import { mockFileSystem, restoreFileSystem, createMockContext } from "./setup.ts";

const { fileNameBankDataEntries } = config;

const mockEntry: BankDataEntry = {
  id: "1",
  bankaccountid: 123,
  postingDate: { day: 1, month: 1, year: 2023 },
  valueDate: { day: 1, month: 1, year: 2023 },
  paymentDate: { day: 1, month: 1, year: 2023 },
  amount: 100,
  recipientOrPayer: "Test Recipient",
  accountNumber: 123456,
  bic: 789,
  event: "Test Event",
  reference: "Test Reference",
  payerReference: "Test Payer Reference",
  message: "Test Message",
  cardNumber: 1234,
  receipt: "Test Receipt",
  category: Category.FOOD,
};

Deno.test("fetchAllDataEntries", async () => {
  const mockEntries: BankDataEntry[] = [mockEntry];

  mockFileSystem({
    [fileNameBankDataEntries]: JSON.stringify(mockEntries),
  });

  const ctx = createMockContext();

  await fetchAllDataEntries(ctx);

  assertEquals(ctx.response.status, 200);
  assertEquals(ctx.response.body, {
    success: true,
    data: mockEntries,
  });

  restoreFileSystem();
});

Deno.test("saveAllDataEntries", async () => {
  const mockEntries: BankDataEntry[] = [mockEntry];

  mockFileSystem({});

  const ctx = createMockContext(mockEntries);

  await saveAllDataEntries(ctx);

  assertEquals(ctx.response.status, 201);
  assertEquals(ctx.response.body, { success: true });

  restoreFileSystem();
});

Deno.test("appendAllDataEntries", async () => {
  const existingEntries: BankDataEntry[] = [mockEntry];
  const newEntries: BankDataEntry[] = [{...mockEntry, id: "2"}];

  mockFileSystem({
    [fileNameBankDataEntries]: JSON.stringify(existingEntries),
  });

  const ctx = createMockContext(newEntries);

  await appendAllDataEntries(ctx);

  assertEquals(ctx.response.status, 201);
  assertEquals(ctx.response.body, { success: true });

  const updatedFileContent = JSON.parse(await Deno.readTextFile(fileNameBankDataEntries));
  assertEquals(updatedFileContent.length, 2);

  restoreFileSystem();
});
