import readline from "readline-sync";

import {getById, update} from "../../util/createJSON.js";
import toTable from "../../util/toTable.js";

import readTugas from "./readTugas.js";

export default async function() {
  // mengambil data list tugas
  const path = "database/list-tugas.json";
  // menampilkan list tugas
  let tugas;
  while (true) {
    await readTugas();

    // input id tugas
    const id = parseInt(
        readline.question("\nPilih ID tugas yg akan diupdate\t: "),
    );
    console.clear();
    tugas = await getById(path, id);
    // jika tugas ada, maka break
    if (tugas)
      break;
    console.log("ID tidak ditemukan");
    readline.question("");
  }
  console.log("\tHasil pencarian tugas");
  const table = await toTable(tugas);
  console.log(table);
  let isUpdate = false;
  let newData = {
    ...tugas,
  };
  while (!isUpdate) {
    const input =
        readline.question("Ingin meng-update tugas ini?(y/n)  :").toLowerCase();
    if (input === "y" || input === "n") {
      if (input === "y")
        isUpdate = true;
      break;
    }
    console.log('\nInput salah! Masukan "y" atau "n"!');
  }
  let date = readline.question(
      'Masukan tanggal (klik "enter" untuk skip)\n format (dd/mm/yyyy)  : ',
  );

  if (!isUpdate)
    return readline.question("klik enter untuk kembali");

  await deleteById(path, tugas.id);
  console.log(`Tugas ID ${tugas.id} berhasil dihapus!`);
}
