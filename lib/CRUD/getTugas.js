import readline from "readline-sync";
import Table from "terminal-table";

import { get } from "../../util/createJSON.js";

export default async function () {
  // get all tugas
  const listTugas = await get("database/list-tugas.json");
  // tugas by date
  // let tugasByDate = {
  //  date,
  //  tugas: [],
  //};

  let newT = new Table({ horizontalLine: true, borderStyle: 2 });
  newT.push(["ID", "Deadline", "Matkul", "Deskripsi"]);
  newT.attrRange(
    { row: [0, 1], column: [0, 4] },
    { color: "green", bg: "black" },
  );

  // sel Deskripsi
  let [rowDesc, columnDesc] = [1, 3];
  // dataset tugas
  let [rowTugasStart, rowTugasEnd] = [1, 1];
  let [columnTugasStart, columnTugasEnd] = [0, 4];
  // warna text
  const colors = ["yellow", "magenta", "cyan", "blue", "red", ""];
  let colorNow = 0;

  for (const tugas of listTugas) {
    newT.push([tugas.id, tugas.date, tugas.matkul.nama]);
    for (const desc of tugas.desc) {
      newT.cell(rowDesc, columnDesc, desc);
      rowDesc++;
      rowTugasEnd++;
    }
    newT.attrRange(
      {
        row: [rowTugasStart, rowTugasEnd],
        column: [columnTugasStart, columnTugasEnd],
      },
      { color: colors[colorNow % colors.length] },
    );
    rowTugasStart = rowTugasEnd;
    colorNow++;
  }

  console.log("" + newT);
}
