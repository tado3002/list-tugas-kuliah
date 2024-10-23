const fs = require("fs");
const jsonPath = "./database/contact-dosen.json";

// create json file from list-contact-dosen data's
(async () => {
  // read list-contact-dosen
  const contactFile =
      await fs.readFileSync("./list-contact-dosen.txt").toString();
  let list = [];

  contactFile.split("\n").forEach((line) => {
    console.log(line);
    const data = line.split("+");
    const [matkul, kontak, nama] = [...data ];
    const dosenContact = {
      nama,
      matkul,
      kontak : "+" + kontak,
      whatsapp : `https://wa.me/+${kontak}`,
    };

    list.push(dosenContact);
  });
  list = list.filter((data) => data.nama !== undefined);
  fs.writeFileSync(jsonPath, JSON.stringify({list}));
})();
