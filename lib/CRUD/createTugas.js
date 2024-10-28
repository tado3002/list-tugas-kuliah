import readline from "readline-sync";

import { append } from "../../util/createJSON.js";
import toDateID from "../../util/toDateID.js";
import getMatkul from "../getMatkul.js";

import getTugas from "./getTugas.js";

export default async function () {
  // ambil semua data list matkul
  let listMatkul = await getMatkul();
  listMatkul = listMatkul.map((data) => {
    return { id: data.id, nama: data.matkul };
  });
  // mengambil id dan nama matkul
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
  // informasi
  let info;
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
  info = `\nMatkul yg dipilih :  ${matkul.nama}`;
  console.log(info);

  // input tanggal deadline (dd/mm/yyyy)
  let date;
  while (true) {
    let isBreak = true;

    try {
      const input = readline.question(
        "\nMasukan tanggal deadline (dd/mm/yyyy) :  ",
      );
      date = toDateID(input.split("/").reverse().join(""));
      console.clear();
    } catch (error) {
      isBreak = false;
      throw Error("Format tanggal salah");
    }

    if (isBreak) break;
  }
  info = `${info}\nDeadline\t:  ${date}`;
  console.log(info);

  let desc = [];
  info = `${info}\nDeskripsi Tugas\t: \n`;
  // input deskripsi tugas
  while (true) {
    const inputDesc = readline.question("\nMasukan deskripsi tugas : \n\t\t> ");
    let allowToInput = ["y", "n"];
    info = `${info}\t> ${inputDesc}\n`;
    console.clear();
    console.log(info);
    desc.push(inputDesc);
    // jika isBreak bukan "y" or "n", maka ulangi pertanyaan
    let isAnswerValid = readline
      .question("Ingin menambahkan deskripsi lagi?(y/n)   : ")
      .toLowerCase();
    while (!allowToInput.includes(isAnswerValid)) {
      isAnswerValid = readline
        .question("Inputan kamu salah, lanjut atau tidak?(y/n)   : ")
        .toLowerCase();
    }
    const isBreak = isAnswerValid === "n" ? true : false;

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
  const data = { matkul, date, desc };

  await append("database/list-tugas.json", data);
  console.log("berhasil menambahkan");
}
