import { glob } from "glob";

export function getAllFiles(id: string) {
  return new Promise<string[]>((resolve) => {
    const pattern = `${process.cwd()}/src/**/*.${id}.ts`;

    glob(pattern, (err, files) => {
      resolve(files);
    });
  });
}
