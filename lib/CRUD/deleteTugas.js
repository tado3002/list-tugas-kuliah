import readline from "readline-sync";

import { deleteById, getById } from "../../util/createJSON.js";
import toTable from "../../util/toTable.js";

import getTugas from "./getTugas.js";

export default async function () {
  // mengambil data list tugas
  const path = "database/list-tugas.json";
  // menampilkan list tugas
  let tugas;
  while (true) {
    await getTugas();

    // input id tugas
    const id = parseInt(
      readline.question("\nPilih ID tugas yg akan dihapus\t: "),
    );
    console.clear();
    tugas = await getById(path, id);
    // jika tugas ada, maka break
    if (tugas) break;
    console.log("ID tidak ditemukan");
    readline.question("");
  }
  console.log("\tHasil pencarian tugas");
  const table = await toTable(tugas);
  console.log(table);
  let isDelete = false;
  while (!isDelete) {
    const input = readline
      .question("Ingin menghapus tugas ini?(y/n)  :")
      .toLowerCase();
    if (input === "y" || input === "n") {
      if (input === "y") isDelete = true;
      break;
    }
    console.log('\nInput salah! Masukan "y" atau "n"!');
  }
  if (!isDelete) return readline.question("klik enter untuk kembali");
  await deleteById(path, tugas.id);
  console.log(`Tugas ID ${tugas.id} berhasil dihapus!`);
}
