import { BankDataEntry } from "../types.ts";
import { RecipientCategory } from "../types.ts";

const fileName = "data/entries.json";
const fileNameCategoryMap = "data/categoryMap.json";
let bankDataEntries: BankDataEntry[] = [];

const fetchCategoryMap = async ({ response }: any) => {
  const text = await Deno.readTextFile(fileNameCategoryMap);  
  const entries: RecipientCategory[] = JSON.parse(text);

  response.status = 200;
  response.body = {
    success: true,
    data: entries
  }
}

const saveCategoryMap = async (
    { request, response }: { request: any; response: any },
  ) => {
    const body = request.body();
    const values: RecipientCategory[] = await body.value;
    if (request.hasBody) {
      Deno.writeTextFileSync(fileNameCategoryMap, JSON.stringify(values));
  
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

const fetchAllDataEntries = async ({ response }: any) => {
  const text = await Deno.readTextFile(fileName);
  const entries: BankDataEntry[] = JSON.parse(text);

  // console.log(JSON.stringify(entries[0]));

  response.status = 200;
  response.body = {
    success: true,
    data: entries,
  };
};

const saveAllDataEntries = async (
  { request, response }: { request: any; response: any },
) => {
  const body = request.body();
  const values: BankDataEntry[] = await body.value;
  if (request.hasBody) {
    bankDataEntries = values;
    Deno.writeTextFileSync(fileName, JSON.stringify(bankDataEntries));

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

export { fetchAllDataEntries, saveAllDataEntries, fetchCategoryMap, saveCategoryMap };
