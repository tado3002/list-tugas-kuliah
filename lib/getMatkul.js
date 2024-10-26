import { readFile } from "fs/promises";
export default async function () {
  const pathJSON = "database/contact-dosen.json";
  const { data } = JSON.parse(await readFile(pathJSON, "utf8"));

  return data;
}
