import { readFile, writeFile } from "fs/promises";

// read datas from database
const pathJSON = "database/contact-dosen.json";
let { data } = JSON.parse(await readFile(pathJSON, "utf8"));

// create text file
const contact = data[0];
let text = `
# Data Dosen ${contact.matkul}
  Nama      : ${contact.nama}
  WhatsApp  : ${contact.whatsapp}
`;
writeFile("output/test.txt", text);
