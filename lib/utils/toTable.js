import Table from "terminal-table";

export default async function (data) {
  let t = new Table({ horizontalLine: true, borderStyle: 2 });
  t.push(["ID", "Deadline", "Matkul", "Deskripsi"]);
  t.push([data.id, data.date, data.matkul.nama]);

  let [rowDesc, columnDesc] = [1, 3];
  data.desc.forEach((text) => {
    t.cell(rowDesc, columnDesc, text);
    rowDesc++;
  });

  t.attrRange({ row: [0, 1], column: [0, 4] }, { color: "green", bg: "black" });
  t.attrRange(
    { row: [1, rowDesc], column: [0, 4] },
    { color: "magenta", bg: "black" },
  );
  return "" + t;
}
