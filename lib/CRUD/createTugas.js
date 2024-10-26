import readline from "readline-sync";

import getMatkul from "../getMatkul.js";

export default async function () {
  //{
  //  "matkul_Id",
  //  "date": "20 September 2024",
  //  "description": [
  //    "1":"mengambil "
  //  ]
  //}

  // masukan matkul
  // masukan tanggal pengumpulan
  // masukan deskripsi
  // menampilkan data matkul
  let listMatkul = await getMatkul();
  listMatkul = listMatkul.map((data) => {
    return { id: data.id, nama: data.matkul };
  });
  const listMatkulID = listMatkul.map((matkul) => matkul.id);
  const menuMatkul = listMatkul
    .map((matkul) => {
      return ` [${matkul.id}]  ${matkul.nama}`;
    })
    .join("\n");
  // menampilkan list matkul
  console.clear();
  console.log(`\nList Matkul prodi STI

  ID  Mata Kuliah

${menuMatkul}
`);

  // input matkul id
  let inputId = null;
  while (true) {
    let input = parseInt(readline.question("\nPilih ID matkul  >  "));

    if (listMatkulID.includes(input)) {
      inputId = input;
      break;
    }

    console.log("\n\tMasukan ID yang benar!\n");
  }

  console.clear();
  const matkul = listMatkul.filter((matkul) => matkul.id === inputId)[0];
  console.log(`\nMatkul yang dipilih :  ${matkul.nama}`);
  // input tanggal deadline (dd/mm/yyyy)
  // belum menambahkan validasi tanggal
  let date;
  while (true) {
    let isBreak = true;

    try {
      const input = readline.question(
        "\nMasukan tanggal deadline (dd/mm/yyyy) :  ",
      );

      date = new Date(input);
    } catch (error) {
      isBreak = false;
      throw Error("Format tanggal salah");
    }

    if (isBreak) break;
  }

  let desc = [];
  // input deskripsi tugas
  while (true) {
    const inputDesc = readline.question("Masukan deskripsi tugas : >  ");
    desc.push(inputDesc);
    const isBreak =
      readline
        .question("Ingin menambahkan deskripsi lagi?(y/n)   : ")
        .toLowerCase() === "y"
        ? false
        : true;
    if (isBreak) break;
  }
  console.clear();
  const tugas = { matkul_Id: inputId, date, desc };
  console.log(`\nTugas yg kamu tambahkan :
  > Matkul\t: ${matkul.nama}
  > Deadline\t: ${tugas.date}
  > Deskripsi\t: \n${desc
    .map((text, id) => {
      return `\t${id + 1}.  ${text}\n`;
    })
    .join("")}
`);

  console.log("berhasil menambahkan");
  readline.question("");
  console.clear();
}
