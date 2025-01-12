import { Context } from "https://deno.land/x/oak@v17.1.4/mod.ts";

// Mock Deno.readTextFile and Deno.writeTextFileSync
export const originalReadTextFile = Deno.readTextFile;
export const originalWriteTextFileSync = Deno.writeTextFileSync;

export function mockFileSystem(fileContents: Record<string, string>) {
  Deno.readTextFile = async (path: string | URL, options?: Deno.ReadFileOptions) => {
    const pathString = path instanceof URL ? path.toString() : path;
    if (pathString in fileContents) {
      return fileContents[pathString];
    }
    throw new Error(`File not found: ${pathString}`);
  };

  Deno.writeTextFileSync = (path: string | URL, data: string, options?: Deno.WriteFileOptions) => {
    const pathString = path instanceof URL ? path.toString() : path;
    fileContents[pathString] = data;
  };
}

export function restoreFileSystem() {
  Deno.readTextFile = originalReadTextFile;
  Deno.writeTextFileSync = originalWriteTextFileSync;
}

export function createMockContext(requestBody?: any): Context {
  return {
    request: {
      hasBody: !!requestBody,
      body: () => ({
        value: Promise.resolve(requestBody),
      }),
    },
    response: {
      status: 0,
      body: {},
    },
  } as unknown as Context;
}
