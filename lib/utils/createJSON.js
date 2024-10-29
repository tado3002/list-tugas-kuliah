import {readFile, writeFile} from "fs/promises";
export async function append(path, dataJSON) {
  try {
    // Memeriksa apakah file JSON sudah ada
    let data = [];
    try {
      const fileContent = await readFile(path, "utf8");
      data = JSON.parse(
          fileContent); // Parse isi file ke dalam array jika file sudah ada
    } catch (error) {
      if (error.code !== "ENOENT")
        throw error; // Lempar error jika error bukan karena file tidak ada
    }

    // Menambahkan data baru ke dalam array
    dataJSON = {id : data.length + 1, ...dataJSON};
    data.push(dataJSON);

    // Menulis array ke dalam file JSON
    await writeFile(path, JSON.stringify(data, null, 2), "utf8");
    console.log("Data berhasil ditambahkan ke file JSON.");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}
export async function get(path) {
  try {
    let data = [];
    const fileContent = await readFile(path, "utf8");
    data = JSON.parse(fileContent);

    return data;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}
export async function getById(path, id) {
  try {
    let data = await get(path);
    const tugas = data.find((tugas) => tugas.id === id);
    return tugas;
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
  }
}

export async function deleteById(path, id) {
  try {
    let data = await get(path);
    // hapus tugas berdasarkan id dari data
    data = data.filter((tugas) => tugas.id !== id);
    // perbarui data id
    data = data.map((tugas, index) => {
      return {
        ...tugas,
        id : index + 1,
      };
    });

    // replace data json lama
    await writeFile(path, JSON.stringify(data), "utf8");
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
  }
}
export async function update(path, newData) {
  try {
    let data = await get(path);
    data = data.map((tugas) => {
      if (tugas.id === newData.id) {
        return {
          ...newData,
        };
      } else {
        return {
          ...tugas,
        };
      }
    });
    await writeFile(path, JSON.stringify(data), "utf8");
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
  }
}
