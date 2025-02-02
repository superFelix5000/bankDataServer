import { BankDataEntry, Category, RecipientCategory } from "../src/types.ts";
import config from "../src/config.ts";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import { Context } from "https://deno.land/x/oak@v17.1.4/mod.ts";

const { fileNameBankDataEntries, fileNameCategoryMap } = config;

const RecipientCategorySchema = z.object({
  recipient: z.string(),
  category: z.nativeEnum(Category),
});

const fetchCategoryMap = async (ctx: Context) => {
  const text = await Deno.readTextFile(fileNameCategoryMap);
  const entries: RecipientCategory[] = JSON.parse(text);

  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    data: entries,
  };
};

const saveCategoryMap = async ({
  request,
  response,
}: { request: any; response: any }) => {
  try {
    if (request.hasBody) {
      const values = await request.body.json();
      const validatedValues = z.array(RecipientCategorySchema).parse(values);
      Deno.writeTextFileSync(fileNameCategoryMap, JSON.stringify(validatedValues));

      response.status = 201;
      response.body = {
        success: true,
      };
    } else {
      response.status = 400;
      response.body = {
        success: false,
        message: "Request body is empty",
      };
    }
  } catch (error: unknown) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Invalid input data",
      errors: error instanceof z.ZodError ? error.errors : undefined,
    };
  }
};

const fetchAllDataEntries = async ({ response }: any) => {
  const text = await Deno.readTextFile(fileNameBankDataEntries);
  const entries: BankDataEntry[] = JSON.parse(text);

  response.status = 200;
  response.body = {
    success: true,
    data: entries,
  };
};

const saveAllDataEntries = async ({
  request,
  response,
}: { request: any; response: any }) => {
  if (request.hasBody) {
    const values: BankDataEntry[] = await request.body.json();
    const newBankDataEntries = values;
    Deno.writeTextFileSync(
      fileNameBankDataEntries,
      JSON.stringify(newBankDataEntries),
    );

    response.status = 201;
    response.body = {
      success: true,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
    };
  }
};

const appendAllDataEntries = async ({
  request,
  response,
}: { request: any; response: any }) => {
  if (request.hasBody) {
    const body = await request.body.json();
    const values: BankDataEntry[] = body;
  
    let newBankDataEntries = values;

    console.log(`entries to add: ${newBankDataEntries.length}`);

    const oldEntriesText = await Deno.readTextFile(fileNameBankDataEntries);
    const oldEntries: BankDataEntry[] = JSON.parse(oldEntriesText);

    console.log(`number of old entries: ${oldEntries.length}`);
    newBankDataEntries = oldEntries.concat(newBankDataEntries);
    console.log(
      `total new number of entries: ${newBankDataEntries.length}`,
    );

    Deno.writeTextFileSync(
      fileNameBankDataEntries,
      JSON.stringify(newBankDataEntries),
    );

    response.status = 201;
    response.body = {
      success: true,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
    };
  }
};

export {
  appendAllDataEntries,
  fetchAllDataEntries,
  fetchCategoryMap,
  saveAllDataEntries,
  saveCategoryMap,
};
