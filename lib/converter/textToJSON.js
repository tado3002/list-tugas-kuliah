import fs from "fs";
const jsonPath = "./database/contact-dosen.json";

// create json file from list-contact-dosen data's
export default async function () {
  // read list-contact-dosen
  const contactFile = fs.readFileSync("./list-contact-dosen.txt").toString();
  let list = [];

  contactFile.split("\n").forEach((line, id) => {
    const data = line.split("+");
    const [matkul, kontak, nama] = [...data];
    const dosenContact = {
      id: id + 1,
      nama,
      matkul,
      kontak: "+" + kontak,
      whatsapp: `https://wa.me/+${kontak}`,
    };

    list.push(dosenContact);
  });
  list = list.filter((data) => data.nama !== undefined);
  console.log(list);
  fs.writeFileSync(jsonPath, JSON.stringify({ data: list }));
}
